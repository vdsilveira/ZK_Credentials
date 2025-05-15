"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ProofResultType, FieldProof } from "@/lib/types"

interface ProofResultProps {
  result: ProofResultType
}

export function ProofResult({ result }: ProofResultProps) {
  const [activeTab, setActiveTab] = useState<string>("overview")

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

  const getFieldLabel = (field: string): string => {
    const fieldLabels: { [key: string]: string } = {
      nome: "Nome",
      cpf: "CPF",
      numeroCNH: "Número da CNH",
      dataNascimento: "Data de Nascimento",
      dataEmissao: "Data de Emissão",
      dataValidade: "Data de Validade",
      categoria: "Categoria",
      uf: "UF",
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
        <h2 className="text-xl font-semibold mb-2">Provas Geradas com Sucesso!</h2>
        <p className="text-gray-600 mb-4">
          Suas provas zero-knowledge foram geradas e vinculadas à sua carteira MetaMask. Você pode baixar as credenciais
          verificáveis para uso em outros sistemas.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="individual">Provas Individuais</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-medium mb-2">Detalhes do Pacote de Provas</h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-sm text-gray-500">ID do Pacote</p>
                <p className="font-mono text-sm break-all">{result.bundleId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Carteira Vinculada</p>
                <p className="font-mono text-sm break-all">{result.walletAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantidade de Provas</p>
                <p>{result.fieldProofs.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Campos com Provas</p>
                <p>{result.fieldProofs.map((fp) => getFieldLabel(fp.field)).join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleDownloadAll} className="px-6 py-3">
              Baixar Todas as Credenciais
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
                        <p className="text-sm text-gray-500">Data de Emissão</p>
                        <p>{fieldProof.credential ? new Date(fieldProof.credential.issuanceDate).toLocaleString() : "—"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => handleDownloadSingle(fieldProof)}>
                      Baixar Credencial
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className="w-full mt-6 pt-6 border-t">
        <h3 className="font-medium mb-4">Como usar suas credenciais</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Privacidade Seletiva:</strong> Cada campo da sua CNH agora tem uma prova individual, permitindo que
            você compartilhe apenas as informações necessárias em cada contexto.
          </p>
          <p>
            <strong>Verificação:</strong> As credenciais podem ser verificadas por terceiros sem revelar os dados
            originais, graças à tecnologia de provas zero-knowledge.
          </p>
          <p>
            <strong>Integração:</strong> Estas credenciais seguem o padrão W3C para Credenciais Verificáveis, podendo
            ser usadas em diversos sistemas compatíveis.
          </p>
        </div>
      </div>
    </div>
  )
}
