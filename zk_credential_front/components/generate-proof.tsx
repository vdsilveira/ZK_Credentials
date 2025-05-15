"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CNHDataType, ProofResultType } from "@/lib/types"
import { MockZKProofService, ZKProof } from "@/services/mock-zk-proof"

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
    nome: true,
    cpf: true,
    registroCNH: true,
    dataNascimento: true,
    dataValidade: true,
    categoria: true,
  })

  const mockService = new MockZKProofService()

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleGenerateProof = async () => {
    if (!consent) {
      setError("Por favor, dê seu consentimento para continuar.")
      return
    }

    // Verificar se pelo menos um campo foi selecionado
    const hasSelectedField = Object.values(selectedFields).some((value) => value)
    if (!hasSelectedField) {
      setError("Selecione pelo menos um campo para incluir na prova.")
      return
    }

    try {
      setIsLoading(true)

      // Preparar os campos selecionados
      const fieldsToInclude = Object.entries(selectedFields)
        .filter(([_, selected]) => selected)
        .map(([field]) => field)

      // Gerar provas para cada campo selecionado
      const fieldProofs = []
      for (const field of fieldsToInclude) {
        const fieldValue = cnh[field as keyof CNHDataType]
        
        // Gerar prova para o campo
        const proof = await mockService.generateProof(field, fieldValue)
        
        // Armazenar a prova
        const proofId = await mockService.storeProof(proof)
        
        // Verificar a prova
        const isValid = await mockService.verifyProof(proofId, proof)
        
        fieldProofs.push({
          field,
          fieldValue,
          proof,
          proofId,
          isValid
        })
      }

      // Criar o resultado
      const result: ProofResultType = {
        walletAddress,
        fieldProofs,
        bundleId: `bundle-${Date.now()}`,
      }

      onProofGenerated(result)
    } catch (error: any) {
      console.error("Erro ao gerar prova:", error)
      setError(error.message || "Erro ao gerar a prova zero-knowledge")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Gerar Provas Zero-Knowledge</h2>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Selecione os campos para gerar provas individuais:</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cada campo selecionado gerará uma prova zero-knowledge específica, permitindo que você compartilhe apenas as
          informações necessárias em diferentes contextos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="field-nome" checked={selectedFields.nome} onCheckedChange={() => handleFieldToggle("nome")} />
            <label
              htmlFor="field-nome"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nome
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="field-cpf" checked={selectedFields.cpf} onCheckedChange={() => handleFieldToggle("cpf")} />
            <label
              htmlFor="field-cpf"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              CPF
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="field-registroCNH"
              checked={selectedFields.registroCNH}
              onCheckedChange={() => handleFieldToggle("registroCNH")}
            />
            <label
              htmlFor="field-registroCNH"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Número da CNH
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="field-dataNascimento"
              checked={selectedFields.dataNascimento}
              onCheckedChange={() => handleFieldToggle("dataNascimento")}
            />
            <label
              htmlFor="field-dataNascimento"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data de Nascimento
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="field-dataValidade"
              checked={selectedFields.dataValidade}
              onCheckedChange={() => handleFieldToggle("dataValidade")}
            />
            <label
              htmlFor="field-dataValidade"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data de Validade
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="field-categoria"
              checked={selectedFields.categoria}
              onCheckedChange={() => handleFieldToggle("categoria")}
            />
            <label
              htmlFor="field-categoria"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Categoria
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} />
          <label htmlFor="consent" className="text-sm text-gray-700">
            Eu concordo com o processamento dos meus dados para geração das provas zero-knowledge e entendo que estes
            dados serão vinculados à minha carteira MetaMask.
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleGenerateProof} disabled={!consent} className="px-6 py-3">
          Gerar Provas Zero-Knowledge
        </Button>
      </div>
    </div>
  )
}
