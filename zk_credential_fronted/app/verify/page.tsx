"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, CheckCircle2, XCircle } from "lucide-react"
import type { FieldProof } from "@/lib/types"

export default function VerifyProof() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [proofType, setProofType] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [retrievedProof, setRetrievedProof] = useState<FieldProof | null>(null)
  const [verificationResult, setVerificationResult] = useState<{ isValid: boolean; message: string } | null>(null)

  const proofTypes = [
    { value: "nome", label: "Nome" },
    { value: "cpf", label: "CPF" },
    { value: "numeroCNH", label: "Número da CNH" },
    { value: "dataNascimento", label: "Data de Nascimento" },
    { value: "dataValidade", label: "Data de Validade" },
    { value: "categoria", label: "Categoria" },
    { value: "docIdentidade", label: "Documento de Identidade" },
    { value: "filiacao", label: "Filiação" },
  ]

  const handleRetrieveProof = async () => {
    if (!walletAddress) {
      setError("Por favor, insira um endereço de carteira.")
      return
    }

    if (!proofType) {
      setError("Por favor, selecione um tipo de prova.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      setRetrievedProof(null)
      setVerificationResult(null)

      const response = await fetch("/api/retrieve-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          proofType,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao recuperar a prova")
      }

      const data = await response.json()
      setRetrievedProof(data)
    } catch (error: any) {
      console.error("Erro ao recuperar prova:", error)
      setError(error.message || "Erro ao recuperar a prova")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyProof = async () => {
    if (!retrievedProof) {
      setError("Nenhuma prova para verificar.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/verify-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof: retrievedProof,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao verificar a prova")
      }

      const { isValid, message } = await response.json()
      setVerificationResult({ isValid, message })
    } catch (error: any) {
      console.error("Erro ao verificar prova:", error)
      setError(error.message || "Erro ao verificar a prova")
    } finally {
      setIsLoading(false)
    }
  }

  const getProofTypeLabel = (value: string) => {
    const type = proofTypes.find((t) => t.value === value)
    return type ? type.label : value
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-70"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-black/5 h-full"></div>
            ))}
          </div>
          <div className="grid grid-rows-12 w-full absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-b border-black/5 w-full"></div>
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-black/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-black/10 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute h-px bg-black/10"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden z-10">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Recuperar e Verificar Provas</h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <button className="float-right font-bold" onClick={() => setError(null)}>
                &times;
              </button>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recuperar Prova</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço da Carteira
                </label>
                <Input
                  id="walletAddress"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="proofType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Prova
                </label>
                <Select value={proofType} onValueChange={setProofType}>
                  <SelectTrigger id="proofType">
                    <SelectValue placeholder="Selecione o tipo de prova" />
                  </SelectTrigger>
                  <SelectContent>
                    {proofTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleRetrieveProof} disabled={isLoading}>
                Recuperar Prova
              </Button>
            </div>
          </div>

          {retrievedProof && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Prova Recuperada</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tipo de Prova</p>
                      <p className="font-medium">{getProofTypeLabel(retrievedProof.field)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Valor</p>
                      <p className="font-medium">{retrievedProof.fieldValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID da Credencial</p>
                      <p className="font-mono text-sm break-all">{retrievedProof.credential.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data de Emissão</p>
                      <p>{new Date(retrievedProof.credential.issuanceDate).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button onClick={handleVerifyProof} disabled={isLoading}>
                      Verificar Prova
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {verificationResult && (
            <Alert
              variant={verificationResult.isValid ? "default" : "destructive"}
              className={verificationResult.isValid ? "bg-green-50 border-green-200" : ""}
            >
              <div className="flex items-center">
                {verificationResult.isValid ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <AlertTitle>{verificationResult.isValid ? "Prova Válida" : "Prova Inválida"}</AlertTitle>
              </div>
              <AlertDescription>{verificationResult.message}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Processando...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
