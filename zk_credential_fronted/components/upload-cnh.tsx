"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { CNHDataType } from "@/lib/types"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

interface UploadCNHProps {
  walletAddress: string
  onCNHProcessed: (data: CNHDataType) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export function UploadCNH({ walletAddress, onCNHProcessed, setIsLoading, setError }: UploadCNHProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [processingTips, setProcessingTips] = useState<string[]>([
    "Processando a imagem...",
    "Extraindo texto com OCR...",
    "Identificando campos da CNH...",
    "Estruturando os dados...",
  ])
  const [currentTip, setCurrentTip] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isProcessing) {
      interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % processingTips.length)
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isProcessing, processingTips.length])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Verificar se é uma imagem
      if (!selectedFile.type.startsWith("image/")) {
        setError("Por favor, selecione um arquivo de imagem válido.")
        return
      }

      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione uma imagem da CNH para upload.")
      return
    }

    try {
      setIsLoading(true)
      setIsProcessing(true)
      setCurrentTip(0)

      const formData = new FormData()
      formData.append("cnh", file)
      formData.append("walletAddress", walletAddress)

      const response = await fetch("/api/process-cnh", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao processar a CNH")
      }

      const data = await response.json()
      onCNHProcessed(data)
    } catch (error: any) {
      console.error("Erro ao fazer upload da CNH:", error)
      setError(error.message || "Erro ao processar a imagem da CNH")
    } finally {
      setIsLoading(false)
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Upload da CNH</h2>
        <p className="text-gray-600">
          Faça o upload de uma imagem clara da sua CNH para extrair os dados. A imagem será processada localmente para
          garantir sua privacidade.
        </p>
      </div>

      <div className="w-full max-w-md mb-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="relative w-full h-48">
              <Image src={preview || "/placeholder.svg"} alt="Preview da CNH" fill style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div className="py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Clique para selecionar ou arraste a imagem da CNH</p>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {file && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full max-w-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Dicas para melhor reconhecimento:</h3>
              <ul className="mt-1 text-xs text-blue-700 list-disc list-inside">
                <li>Certifique-se que a imagem está bem iluminada</li>
                <li>Evite reflexos ou sombras sobre o documento</li>
                <li>A CNH deve estar completamente visível na imagem</li>
                <li>O texto deve estar legível e não borrado</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={handleUpload} disabled={!file || isProcessing} className="px-6 py-3">
          {isProcessing ? processingTips[currentTip] : "Processar CNH"}
        </Button>
      </div>
    </div>
  )
}
