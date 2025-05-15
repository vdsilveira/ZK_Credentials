"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ConnectWalletProps {
  onConnect: (address: string) => void
  setError: (error: string | null) => void
}

export function ConnectWallet({ onConnect, setError }: ConnectWalletProps) {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { ethereum } = window as any
      setIsMetaMaskInstalled(!!ethereum && !!ethereum.isMetaMask)
    }
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any

      if (!ethereum) {
        setError("MetaMask não encontrado. Por favor, instale a extensão MetaMask.")
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        setError("Nenhuma conta encontrada. Por favor, conecte-se ao MetaMask.")
        return
      }

      const address = accounts[0]
      onConnect(address)
    } catch (error: any) {
      console.error("Erro ao conectar carteira:", error)
      setError(error.message || "Erro ao conectar com MetaMask")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Conecte sua Carteira</h2>
        <p className="text-gray-600">
        Para iniciar o processo de validação da CNH, conecte sua carteira cripto. Seus dados serão vinculados à prova Zero-Knowledge gerada.
        </p>
      </div>

      {!isMetaMaskInstalled ? (
        <div className="text-center">
          <p className="text-red-500 mb-4">
            MetaMask não detectado. Por favor, instale a extensão MetaMask para continuar.
          </p>
          <Button onClick={() => window.open("https://metamask.io/download/", "_blank")}>Instalar MetaMask</Button>
        </div>
      ) : (
        <Button onClick={connectWallet} className="px-6 py-3">
          Conectar Carteira
        </Button>
      )}
    </div>
  )
}
