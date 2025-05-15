"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import type { CNHDataType } from "@/lib/types"
import Image from "next/image"
import { createWorker } from 'tesseract.js'
import { hexlify, randomBytes, keccak256 } from "ethers"

interface UploadCNHProps {
  walletAddress: string
  onCNHProcessed: (data: CNHDataType) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export function UploadCNH({ walletAddress, onCNHProcessed, setIsLoading, setError }: UploadCNHProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      setError(null)
    }
  }

  const processImageLocally = async (imageFile: File): Promise<string> => {
    console.log('Iniciando processamento da imagem...');
    const worker = await createWorker('por', 1, {
      logger: m => {
        console.log('Progresso do Tesseract:', m)
        setProgress(`Processando: ${Math.round(m.progress * 100)}%`)
      }
    })

    try {
      console.log('Configurando parâmetros do Tesseract...');
      // Configurar parâmetros do Tesseract para melhor reconhecimento
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/:-.',
        preserve_interword_spaces: '1',
        tessedit_pageseg_mode: '6', // Assume um bloco uniforme de texto
        tessjs_create_pdf: '0',
        tessjs_create_hocr: '0',
        tessjs_create_tsv: '0',
        tessjs_create_box: '0',
        tessjs_create_unlv: '0',
        tessjs_create_osd: '0',
      });

      console.log('Iniciando reconhecimento do texto...');
      const { data: { text } } = await worker.recognize(imageFile)
      console.log("Texto bruto extraído pelo Tesseract:", text)

      if (!text || text.trim().length === 0) {
        throw new Error("Não foi possível extrair texto da imagem. Por favor, tente novamente com uma imagem mais clara.");
      }

      // Pré-processar o texto antes de enviar
      const processedText = text
        .replace(/\n+/g, ' ') // Substituir múltiplas quebras de linha por espaço
        .replace(/\s+/g, ' ') // Substituir múltiplos espaços por um único
        .replace(/([A-Z])\s+([A-Z])/g, '$1$2') // Juntar letras maiúsculas separadas por espaço
        .replace(/(\d)\s+(\d)/g, '$1$2') // Juntar números separados por espaço
        .trim();

      console.log("Texto processado antes do envio:", processedText);
      
      if (processedText.length < 50) {
        throw new Error("Texto extraído muito curto. Por favor, tente novamente com uma imagem mais clara.");
      }

      return processedText;
    } catch (error) {
      console.error("Erro no processamento da imagem:", error);
      throw error;
    } finally {
      await worker.terminate()
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione uma imagem da CNH para upload.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Primeiro, processar a imagem localmente
      console.log('Iniciando processamento da imagem...');
      const extractedText = await processImageLocally(file)
      console.log("Texto final extraído:", extractedText)

      // Enviar o texto extraído para o servidor processar
      const formData = new FormData()
      formData.append("cnh", file)
      formData.append("walletAddress", walletAddress)
      formData.append("extractedText", extractedText)

      console.log("Enviando dados para processamento...");
      const response = await fetch("/api/process-cnh", {
        method: "POST",
        body: formData,
      })

      const responseData = await response.json()
      console.log("Resposta do servidor:", responseData);

      if (!response.ok) {
        console.error("Erro na resposta do servidor:", responseData);
        throw new Error(responseData.message || "Erro ao processar a CNH")
      }

      if (!responseData.nome || !responseData.cpf || !responseData.registroCNH) {
        console.error("Dados incompletos recebidos:", responseData);
        throw new Error("Não foi possível extrair todos os dados necessários da CNH. Por favor, tente novamente com uma imagem mais clara.")
      }

      console.log("Dados processados com sucesso:", responseData);
      onCNHProcessed(responseData)
    } catch (error: any) {
      console.error("Erro ao fazer upload da CNH:", error)
      setError(error.message || "Erro ao processar a imagem da CNH")
    } finally {
      setIsLoading(false)
      setProgress("")
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
              <Image src={preview} alt="Preview da CNH" fill style={{ objectFit: "contain" }} />
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

      {progress && (
        <div className="mb-4 text-sm text-blue-600">
          {progress}
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={handleUpload} disabled={!file} className="px-6 py-3">
          Processar CNH
        </Button>
      </div>
    </div>
  )
}
