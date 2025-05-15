"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ConnectWallet } from "@/components/connect-wallet"
import { UploadCNH } from "@/components/upload-cnh"
import { CNHData } from "@/components/cnh-data"
import { GenerateProof } from "@/components/generate-proof"
import { ProofResult } from "@/components/proof-result"
import type { CNHDataType, ProofResultType } from "@/lib/types"

export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-8">zkCred — Credenciais verificáveis com Zero-Knowledge</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <button className="float-right font-bold" onClick={() => setError(null)}>
                &times;
              </button>
            </div>
          )}

          <div className="flex justify-between mb-8">
            <div
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 1 ? "border-blue-500 font-bold" : "border-gray-200"
              }`}
            >
              Conectar Carteira
            </div>
            <div
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 2 ? "border-blue-500 font-bold" : "border-gray-200"
              }`}
            >
              Upload CNH
            </div>
            <div
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 3 ? "border-blue-500 font-bold" : "border-gray-200"
              }`}
            >
              Gerar Prova
            </div>
            <div
              className={`flex-1 text-center pb-2 border-b-2 ${
                step === 4 ? "border-blue-500 font-bold" : "border-gray-200"
              }`}
            >
              Resultado
            </div>
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
