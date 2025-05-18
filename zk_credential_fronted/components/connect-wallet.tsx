"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ConnectWalletProps {
  onConnect: (address: string) => void
  setError: (error: string | null) => void
}

export function ConnectWallet({ onConnect, setError }: ConnectWalletProps) {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false)

  // ID da rede Sepolia
  const SEPOLIA_CHAIN_ID = "0xaa36a7" // 11155111 em hexadecimal

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { ethereum } = window as any
      setIsMetaMaskInstalled(!!ethereum && !!ethereum.isMetaMask)

      // Verificar a rede atual
      if (!!ethereum && !!ethereum.isMetaMask) {
        ethereum
          .request({ method: "eth_chainId" })
          .then((chainId: string) => {
            setIsCorrectNetwork(chainId === SEPOLIA_CHAIN_ID)
          })
          .catch((error: any) => {
            console.error("Erro ao verificar a rede:", error)
          })

        // Ouvir mudanças de rede
        ethereum.on("chainChanged", (chainId: string) => {
          setIsCorrectNetwork(chainId === SEPOLIA_CHAIN_ID)
        })
      }
    }

    return () => {
      // Limpar listeners
      const { ethereum } = window as any
      if (ethereum && ethereum.removeListener) {
        ethereum.removeListener("chainChanged", () => {})
      }
    }
  }, [])

  const switchToSepoliaNetwork = async () => {
    try {
      const { ethereum } = window as any

      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      })

      // A rede foi alterada com sucesso
      setIsCorrectNetwork(true)
    } catch (switchError: any) {
      // Código 4902 significa que a rede não existe no MetaMask
      if (switchError.code === 4902) {
        try {
          const { ethereum } = window as any

          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia Test Network",
                nativeCurrency: {
                  name: "Sepolia ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          })

          // A rede foi adicionada com sucesso
          setIsCorrectNetwork(true)
        } catch (addError) {
          console.error("Erro ao adicionar a rede Sepolia:", addError)
          setError("Não foi possível adicionar a rede Sepolia. Por favor, adicione manualmente no MetaMask.")
        }
      } else {
        console.error("Erro ao mudar para a rede Sepolia:", switchError)
        setError("Não foi possível mudar para a rede Sepolia. Por favor, tente novamente.")
      }
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any

      if (!ethereum) {
        setError("MetaMask não encontrado. Por favor, instale a extensão MetaMask.")
        return
      }

      // Primeiro, verificar se estamos na rede correta
      const chainId = await ethereum.request({ method: "eth_chainId" })
      if (chainId !== SEPOLIA_CHAIN_ID) {
        setError("Por favor, mude para a rede Sepolia antes de conectar.")
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
        <h2 className="text-xl font-semibold mb-4">Conecte sua carteira MetaMask</h2>
        <p className="text-gray-600">
          Para iniciar o processo de validação da CNH, conecte sua carteira MetaMask na rede Sepolia. Sua identidade
          será vinculada à prova zero-knowledge gerada.
        </p>
      </div>

      {!isMetaMaskInstalled ? (
        <div className="text-center">
          <p className="text-red-500 mb-4">
            MetaMask não detectado. Por favor, instale a extensão MetaMask para continuar.
          </p>
          <Button onClick={() => window.open("https://metamask.io/download/", "_blank")}>Instalar MetaMask</Button>
        </div>
      ) : !isCorrectNetwork ? (
        <div className="text-center">
          <p className="text-amber-600 mb-4">Por favor, conecte-se à rede Sepolia para continuar.</p>
          <Button onClick={switchToSepoliaNetwork} className="px-6 py-3 mb-4">
            Mudar para Rede Sepolia
          </Button>
          <p className="text-sm text-gray-500">Após mudar para a rede Sepolia, você poderá conectar sua carteira.</p>
        </div>
      ) : (
        <Button onClick={connectWallet} className="px-6 py-3">
          Conectar MetaMask
        </Button>
      )}
    </div>
  )
}
