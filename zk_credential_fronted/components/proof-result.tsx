"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ProofResultType, FieldProof } from "@/lib/types"
import { ExternalLink } from "lucide-react"
import { CONTRACT_ADDRESS } from "@/lib/constants"

interface ProofResultProps {
  result: ProofResultType
}

export function ProofResult({ result }: ProofResultProps) {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [showRawProof, setShowRawProof] = useState<boolean>(false)

  const handleDownloadAll = () => {
    const dataStr = JSON.stringify(result, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataUri)
    downloadAnchorNode.setAttribute("download", "cnh-credentials-bundle.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleDownloadSingle = (fieldProof: FieldProof) => {
    const dataStr = JSON.stringify(fieldProof.credential, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataUri)
    downloadAnchorNode.setAttribute("download", `cnh-credential-${fieldProof.field}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleDownloadRawProof = () => {
    if (!result.externalProof) return

    const dataStr = JSON.stringify({ proof: result.externalProof }, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataUri)
    downloadAnchorNode.setAttribute("download", "raw-proof.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const getFieldLabel = (field: string): string => {
    const fieldLabels: { [key: string]: string } = {
      cpf: "CPF",
      dataNascimento: "Data de Nascimento",
      dataValidade: "Data de Validade",
      categoria: "Categoria",
    }
    return fieldLabels[field] || field
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Credencial ZKP Gerada com Sucesso!</h2>
        <p className="text-gray-600 mb-4">
          Sua credencial zero-knowledge foi gerada e vinculada à sua carteira MetaMask. Você pode baixar a credencial
          para uso em outros sistemas.
        </p>
        <div className="flex justify-center">
          <a
            href={`https://sepolia.etherscan.io/address/${result.walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Ver sua carteira na Sepolia Etherscan
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="individual">Campos da Credencial</TabsTrigger>
          <TabsTrigger value="rawproof">Prova ZKP</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-medium mb-2">Detalhes da Credencial</h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-sm text-gray-500">ID da Credencial</p>
                <p className="font-mono text-sm break-all">{result.bundleId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Carteira Vinculada</p>
                <p className="font-mono text-sm break-all">{result.walletAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantidade de Campos</p>
                <p>{result.fieldProofs.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Campos Incluídos</p>
                <p>{result.fieldProofs.map((fp) => getFieldLabel(fp.field)).join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contrato Inteligente</p>
                <a
                  href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-blue-600 hover:underline break-all"
                >
                  {CONTRACT_ADDRESS}
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleDownloadAll} className="px-6 py-3">
              Baixar Credencial Completa
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="w-full">
          <Accordion type="single" collapsible className="w-full mb-6">
            {result.fieldProofs.map((fieldProof, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="font-medium">{getFieldLabel(fieldProof.field)}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Campo</p>
                        <p className="font-medium">{getFieldLabel(fieldProof.field)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valor</p>
                        <p className="font-medium">{fieldProof.fieldValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ID da Credencial</p>
                        <p className="font-mono text-sm break-all">{fieldProof.credential.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Data de Emissão</p>
                        <p>{new Date(fieldProof.credential.issuanceDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status no Contrato</p>
                        <p className="text-green-600">Registrado na blockchain Sepolia</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => handleDownloadSingle(fieldProof)}>
                      Baixar Atestado
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="rawproof" className="w-full">
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-medium mb-4">Prova Zero-Knowledge</h3>
            <p className="text-sm text-gray-600 mb-4">
              Esta é a prova zero-knowledge gerada pelo serviço criptográfico. Esta prova pode ser usada para
              verificação em sistemas compatíveis sem revelar os dados originais.
            </p>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Dados da Prova</h4>
                <Button variant="outline" size="sm" onClick={() => setShowRawProof(!showRawProof)}>
                  {showRawProof ? "Ocultar" : "Mostrar"}
                </Button>
              </div>

              {showRawProof && result.externalProof && (
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs whitespace-pre-wrap break-all">{result.externalProof}</pre>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button onClick={handleDownloadRawProof} disabled={!result.externalProof}>
                Baixar Prova ZKP
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="w-full mt-6 pt-6 border-t">
        <h3 className="font-medium mb-4">Como usar sua credencial</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Privacidade Seletiva:</strong> Sua credencial ZKP permite compartilhar apenas as informações
            necessárias em cada contexto, sem revelar dados adicionais.
          </p>
          <p>
            <strong>Verificação:</strong> A credencial pode ser verificada por terceiros sem revelar os dados originais,
            graças à tecnologia de provas zero-knowledge.
          </p>
          <p>
            <strong>Integração:</strong> Esta credencial segue o padrão W3C para Credenciais Verificáveis, podendo ser
            usada em diversos sistemas compatíveis.
          </p>
          <p>
            <strong>Blockchain:</strong> Todos os campos foram registrados na rede Sepolia e podem ser verificados
            diretamente na blockchain.
          </p>
        </div>
      </div>
    </div>
  )
}
