"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CNHDataType, ProofResultType } from "@/lib/types"

interface GenerateProofProps {
  cnh: CNHDataType
  walletAddress: string
  onProofGenerated: (result: ProofResultType) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export function GenerateProof({
  cnh,
  walletAddress,
  onProofGenerated,
  setIsLoading,
  setError,
}: GenerateProofProps) {
  const [consent, setConsent] = useState(false)

  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({
    nome: false,
    cpf: true,
    registroCNH: false,
    dataNascimento: false,
    dataValidade: false,
    categoria: false,
  })

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

    const atLeastOneSelected = Object.values(selectedFields).some(Boolean)
    if (!atLeastOneSelected) {
      setError("Selecione pelo menos um campo para incluir na prova.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const fieldProofs = []

      for (const [field, selected] of Object.entries(selectedFields)) {
        if (!selected) continue

        // Campos "nome" e "registroCNH" não possuem prova implementada
        if (field === "nome" || field === "registroCNH") {
          console.log(`[${field}] Prova para este campo ainda não está implementada.`)
          continue
        }

        const res = await fetch("/api/generate-proof", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field }),
        })

        if (!res.ok) {
          let errorMsg = "Erro na geração da prova"
          try {
            const errorData = await res.json()
            errorMsg = errorData?.error || errorMsg
            console.error("Detalhes do erro da API:", errorData)
          } catch (parseErr) {
            console.error("Falha ao analisar resposta de erro da API:", parseErr)
          }
          throw new Error(errorMsg)
        }

        const { result } = await res.json()

        if (!result || !result.proofHex || !result.publicInputs || !result.vkHex) {
          throw new Error("Resposta inválida do servidor ao gerar a prova.")
        }

        fieldProofs.push({
          field,
          _fieldValue: cnh[field as keyof CNHDataType],
          get fieldValue() {
            return this._fieldValue
          },
          set fieldValue(value) {
            this._fieldValue = value
          },
          proof: result.proofHex,
          publicInputs: result.publicInputs,
          verificationKey: result.vkHex,
          isValid: true,
        })
      }

      const result: ProofResultType = {
        walletAddress,
        fieldProofs,
        bundleId: `bundle-${Date.now()}`,
      }

      onProofGenerated(result)
    } catch (err: any) {
      console.error("Erro ao gerar prova:", err)
      setError(err?.message || "Erro ao gerar a prova zero-knowledge.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Gerar Provas Zero-Knowledge</h2>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Selecione os campos:</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cada campo selecionado gerará uma prova zero-knowledge, permitindo compartilhar apenas o necessário.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: "nome", label: "Nome" },
            { id: "cpf", label: "CPF" },
            { id: "registroCNH", label: "Número da CNH" },
            { id: "dataNascimento", label: "Data de Nascimento" },
            { id: "dataValidade", label: "Data de Validade" },
            { id: "categoria", label: "Categoria" },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={`field-${id}`}
                checked={selectedFields[id]}
                onCheckedChange={() => handleFieldToggle(id)}
              />
              <label
                htmlFor={`field-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked as boolean)}
          />
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
