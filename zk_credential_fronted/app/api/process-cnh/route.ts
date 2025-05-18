import { type NextRequest, NextResponse } from "next/server"
import type { CNHDataType } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const cnh = formData.get("cnh") as File
    const walletAddress = formData.get("walletAddress") as string

    if (!cnh) {
      return NextResponse.json({ message: "Imagem da CNH não fornecida" }, { status: 400 })
    }

    if (!walletAddress) {
      return NextResponse.json({ message: "Endereço da carteira não fornecido" }, { status: 400 })
    }

    // Retornar dados simulados para fins de demonstração
    const simulatedData: CNHDataType = {
      nome: "EDUARDO AUGUSTO DA SILVA",
      cpf: "999.999.999-99",
      numeroCNH: "9999999999",
      dataNascimento: "01/01/1980",
      dataEmissao: "16/12/1999",
      dataValidade: "24/02/2025",
      categoria: "B",
      uf: "MG",
      docIdentidade: "M9999999 SSP MG",
      filiacao: "JOSE DA SILVA, MARIA PEREIRA DA SILVA",
    };

    // Adicionar um pequeno atraso para simular o processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(simulatedData);
  } catch (error: any) {
    console.error("Erro ao processar CNH:", error)
    return NextResponse.json({ message: "Erro ao processar a imagem da CNH: " + error.message }, { status: 500 })
  }
}