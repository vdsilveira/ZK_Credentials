"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ConnectWallet } from "@/components/connect-wallet"
import { UploadCNH } from "@/components/upload-cnh"
import { CNHData } from "@/components/cnh-data"
import { GenerateProof } from "@/components/generate-proof"
import { ProofResult } from "@/components/proof-result"
import type { CNHDataType, ProofResultType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CreateProof() {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [cnh, setCNH] = useState<CNHDataType | null>(null)
  const [proofResult, setProofResult] = useState<ProofResultType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setStep(2)
  }

  const handleCNHData = (data: CNHDataType) => {
    setCNH(data)
    setStep(3)
  }

  const handleProofGenerated = (result: ProofResultType) => {
    setProofResult(result)
    setStep(4)
  }

  const canNavigateToStep = (targetStep: number) => {
    // Sempre pode voltar para o estágio atual ou anterior
    if (targetStep <= step) return true

    // Verificações para avançar para estágios futuros
    if (targetStep === 2 && walletAddress) return true
    if (targetStep === 3 && cnh) return true
    if (targetStep === 4 && proofResult) return true

    return false
  }

  const handleStepNavigation = (targetStep: number) => {
    if (canNavigateToStep(targetStep)) {
      setStep(targetStep)
    } else {
      // Opcional: mostrar mensagem de erro explicando por que não pode navegar
      const messages = {
        2: "Conecte sua carteira MetaMask primeiro.",
        3: "Faça o upload da CNH primeiro.",
        4: "Gere a prova zero-knowledge primeiro.",
      }
      setError(messages[targetStep as keyof typeof messages] || "Complete os passos anteriores primeiro.")
    }
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
            <h1 className="text-2xl font-bold">Gerar Credencial ZKP</h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <button className="float-right font-bold" onClick={() => setError(null)}>
                &times;
              </button>
            </div>
          )}

          <div className="flex justify-between mb-8">
            {[
              { step: 1, label: "Conectar Carteira" },
              { step: 2, label: "Upload CNH" },
              { step: 3, label: "Gerar Prova" },
              { step: 4, label: "Resultado" },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex-1 text-center pb-2 border-b-2 ${
                  step === item.step ? "border-blue-500 font-bold" : "border-gray-200"
                } ${
                  canNavigateToStep(item.step) ? "cursor-pointer hover:text-blue-600" : "cursor-not-allowed opacity-70"
                }`}
                onClick={() => handleStepNavigation(item.step)}
              >
                {item.label}
              </div>
            ))}
          </div>

          {step === 1 && <ConnectWallet onConnect={handleWalletConnect} setError={setError} />}

          {step === 2 && (
            <UploadCNH
              walletAddress={walletAddress}
              onCNHProcessed={handleCNHData}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          )}

          {step === 3 && cnh && (
            <div>
              <CNHData data={cnh} />
              <GenerateProof
                cnh={cnh}
                walletAddress={walletAddress}
                onProofGenerated={handleProofGenerated}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            </div>
          )}

          {step === 4 && proofResult && <ProofResult result={proofResult} />}

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
