"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CNHDataType, ProofResultType } from "@/lib/types"
import { ethers } from "ethers"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { CONTRACT_ADDRESS } from "@/lib/constants"

// ABI simplificado do contrato (apenas as funções que vamos usar)
const contractABI = [
  "function set_cnh_cpf(string memory cpf_prove, uint32 cnh_cpf) public",
  "function set_cnh_validaty(string memory validaty_prove, uint32 cnh_validaty) public",
  "function set_cnh_category(string memory category_prove, string memory cnh_category) public",
  "function set_cnh_birthday(string memory birthday_prove, uint32 cnh_birthday) public",
]


interface GenerateProofProps {
  cnh: CNHDataType
  walletAddress: string
  onProofGenerated: (result: ProofResultType) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export function GenerateProof({ cnh, walletAddress, onProofGenerated, setIsLoading, setError }: GenerateProofProps) {
  const [consent, setConsent] = useState<boolean>(false)
  const [selectedFields, setSelectedFields] = useState<{
    [key: string]: boolean
  }>({
    cpf: false,
    dataNascimento: false,
    dataValidade: false,
    categoria: false,
  })
  const [contractTxs, setContractTxs] = useState<{
    [key: string]: { status: "pending" | "success" | "error"; hash?: string; error?: string }
  }>({})

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Função para converter datas no formato DD/MM/YYYY para timestamp UNIX (segundos)
  const dateToUnixTimestamp = (dateStr: string): number => {
    const [day, month, year] = dateStr.split("/").map(Number)
    const date = new Date(year, month - 1, day)
    return Math.floor(date.getTime() / 1000)
  }

  // Função para interagir com o contrato inteligente
  const interactWithContract = async (fieldType: string, proofValue: string, fieldValue: string) => {
    try {
      // Verificar se o MetaMask está disponível
      const { ethereum } = window as any
      if (!ethereum) throw new Error("MetaMask não encontrado")

      // Criar provider e signer
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()

      // Criar instância do contrato
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

      // Atualizar status da transação
      setContractTxs((prev) => ({
        ...prev,
        [fieldType]: { status: "pending" },
      }))

      let tx

      // Chamar a função apropriada do contrato com base no tipo de campo
      switch (fieldType) {
        case "cpf":
          // Remover pontos e traços do CPF
          const cpfNumeric = 123456789 // Exemplo de CPF numérico
          tx = await contract.set_cnh_cpf(
            proofValue, // Converter a prova para bytes
            cpfNumeric, // Valor numérico do CPF
          )
          break

        case "dataValidade":
          // Converter data para timestamp UNIX
          const validityTimestamp = dateToUnixTimestamp(fieldValue)
          tx = await contract.set_cnh_validaty(ethers.toUtf8Bytes(proofValue), validityTimestamp)
          break

        case "categoria":
          tx = await contract.set_cnh_category(
            ethers.toUtf8Bytes(proofValue),
            fieldValue, // Categoria como string
          )
          break

        case "dataNascimento":
          // Converter data para timestamp UNIX
          const birthdayTimestamp = dateToUnixTimestamp(fieldValue)
          tx = await contract.set_cnh_birthday(ethers.toUtf8Bytes(proofValue), birthdayTimestamp)
          break

        default:
          throw new Error(`Tipo de campo não suportado pelo contrato: ${fieldType}`)
      }

      // Aguardar a confirmação da transação
      await tx.wait()

      // Atualizar status da transação para sucesso
      setContractTxs((prev) => ({
        ...prev,
        [fieldType]: { status: "success", hash: tx.hash },
      }))

      return tx.hash
    } catch (error: any) {
      console.error(`Erro ao interagir com o contrato para ${fieldType}:`, error)

      // Atualizar status da transação para erro
      setContractTxs((prev) => ({
        ...prev,
        [fieldType]: { status: "error", error: error.message },
      }))

      throw error
    }
  }

  const handleGenerateProof = async () => {
    if (!consent) {
      setError("Por favor, dê seu consentimento para continuar.")
      return
    }

    // Verificar se pelo menos um campo foi selecionado
    const hasSelectedField = Object.values(selectedFields).some((value) => value)
    if (!hasSelectedField) {
      setError("Selecione pelo menos um campo para incluir na credencial.")
      return
    }

    try {
      setIsLoading(true)

      // Preparar os dados para enviar ao backend
      const fieldsToInclude = Object.entries(selectedFields)
        .filter(([_, selected]) => selected)
        .map(([field]) => field)

      // Verificar se CPF está selecionado para adicionar o complemento específico
      const isCpfSelected = selectedFields.cpf

      // Construir a URL base
      let url = "https://zk-credentials.onrender.com/createProve/"

      // Adicionar complemento se CPF estiver selecionado
      if (isCpfSelected) {
        url += "cpfAcessProof/123456789"
      }

      // Fazer a requisição GET para a API externa
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao gerar a credencial")
      }

      // Obter o payload da resposta
      const externalProofData = await response.json()

      // Criar o resultado com a prova externa
      const result: ProofResultType = {
        walletAddress,
        fieldProofs: fieldsToInclude.map((field) => ({
          field,
          fieldValue: cnh[field as keyof CNHDataType],
          proof: {
            type: "ZKProof2023",
            proofValue: externalProofData.proof,
            created: new Date().toISOString(),
            proofPurpose: "assertionMethod",
            verificationMethod: "did:example:issuer#zk-key-1",
          },
          credential: {
            "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
            id: `urn:uuid:${crypto.randomUUID()}`,
            type: [
              "VerifiableCredential",
              "CNHCredential",
              `CNH${field.charAt(0).toUpperCase() + field.slice(1)}Credential`,
            ],
            issuer: "did:example:issuer",
            issuanceDate: new Date().toISOString(),
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            credentialSubject: {
              id: `did:ethr:${walletAddress}`,
              type: "CNHCredential",
              [field]: cnh[field as keyof CNHDataType],
            },
            proof: {
              type: "ZKProof2023",
              proofValue: externalProofData.proof,
              created: new Date().toISOString(),
              proofPurpose: "assertionMethod",
              verificationMethod: "did:example:issuer#zk-key-1",
            },
          },
        })),
        bundleId: crypto.randomUUID(),
        externalProof: externalProofData.proof,
      }

      // Interagir com o contrato inteligente para cada campo selecionado
      for (const field of fieldsToInclude) {
        try {
          const fieldValue = cnh[field as keyof CNHDataType]
          await interactWithContract(field, externalProofData.proof, fieldValue)
        } catch (error) {
          console.error(`Falha ao registrar ${field} no contrato:`, error)
          // Continuamos com os outros campos mesmo se um falhar
        }
      }

      onProofGenerated(result)
    } catch (error: any) {
      console.error("Erro ao gerar credencial:", error)
      setError(error.message || "Erro ao gerar a credencial zero-knowledge")
    } finally {
      setIsLoading(false)
    }
  }

  // Mapeamento de campos para rótulos mais amigáveis
  const fieldLabels: { [key: string]: string } = {
    cpf: "CPF",
    dataNascimento: "Data de Nascimento",
    dataValidade: "Data de Validade",
    categoria: "Categoria",
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Gerar Credencial ZKP</h2>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Selecione os campos para incluir na credencial:</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cada campo selecionado será incluído na sua credencial ZKP e registrado no contrato inteligente na rede
          Sepolia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.keys(selectedFields).map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox
                id={`field-${field}`}
                checked={selectedFields[field]}
                onCheckedChange={() => handleFieldToggle(field)}
              />
              <label
                htmlFor={`field-${field}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fieldLabels[field]}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status das transações do contrato */}
      {Object.keys(contractTxs).length > 0 && (
        <div className="mb-6 border border-gray-200 rounded-lg p-4">
          <h3 className="text-md font-medium mb-3">Status das Transações no Contrato:</h3>
          <div className="space-y-2">
            {Object.entries(contractTxs).map(([field, txInfo]) => (
              <div key={field} className="flex items-center justify-between">
                <div className="flex items-center">
                  {txInfo.status === "pending" && <Loader2 className="h-4 w-4 mr-2 animate-spin text-amber-500" />}
                  {txInfo.status === "success" && <div className="h-4 w-4 mr-2 rounded-full bg-green-500"></div>}
                  {txInfo.status === "error" && <div className="h-4 w-4 mr-2 rounded-full bg-red-500"></div>}
                  <span className="text-sm font-medium">{fieldLabels[field]}</span>
                </div>
                <div>
                  {txInfo.status === "pending" && <span className="text-xs text-amber-600">Processando...</span>}
                  {txInfo.status === "success" && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${txInfo.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Ver transação
                    </a>
                  )}
                  {txInfo.status === "error" && <span className="text-xs text-red-600">Falhou</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} />
          <label htmlFor="consent" className="text-sm text-gray-700">
            Eu concordo com o processamento dos meus dados para geração da credencial zero-knowledge e entendo que estes
            dados serão vinculados à minha carteira MetaMask e registrados no contrato inteligente na rede Sepolia.
          </label>
        </div>
      </div>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-800">
          Todos os campos selecionados serão registrados no contrato inteligente na rede Sepolia. Isso exigirá uma
          transação para cada campo.
        </AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button onClick={handleGenerateProof} disabled={!consent} className="px-6 py-3">
          Gerar Credencial ZKP
        </Button>
      </div>
    </div>
  )
}
