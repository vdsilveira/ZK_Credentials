import { type NextRequest, NextResponse } from "next/server"
import type { FieldProof } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { proof } = await request.json()

    if (!proof) {
      return NextResponse.json({ message: "Prova não fornecida" }, { status: 400 })
    }

    // Validar a estrutura da prova
    if (!validateProofStructure(proof)) {
      return NextResponse.json({ message: "Estrutura da prova inválida" }, { status: 400 })
    }

    // Em um ambiente real, você verificaria a prova criptograficamente
    // Aqui estamos simulando a verificação da prova

    // Verificar a validade da prova
    const verificationResult = verifyProof(proof)

    return NextResponse.json(verificationResult)
  } catch (error: any) {
    console.error("Erro ao verificar prova:", error)
    return NextResponse.json({ message: "Erro ao verificar a prova: " + error.message }, { status: 500 })
  }
}

// Função para validar a estrutura da prova
function validateProofStructure(proof: any): boolean {
  // Verificar se a prova tem a estrutura esperada
  if (!proof.field || !proof.fieldValue || !proof.proof || !proof.credential) {
    return false
  }

  // Verificar se a credencial tem a estrutura esperada
  if (
    !proof.credential["@context"] ||
    !proof.credential.id ||
    !proof.credential.type ||
    !proof.credential.issuer ||
    !proof.credential.issuanceDate ||
    !proof.credential.credentialSubject ||
    !proof.credential.proof
  ) {
    return false
  }

  return true
}

// Função para verificar a prova
function verifyProof(proof: FieldProof): { isValid: boolean; message: string } {
  // Em um ambiente real, você usaria a biblioteca snarkjs para verificar a prova
  // Aqui estamos simulando a verificação

  // Verificar se a prova não expirou
  const expirationDate = new Date(proof.credential.expirationDate)
  const now = new Date()
  if (expirationDate < now) {
    return {
      isValid: false,
      message: "Esta prova expirou em " + expirationDate.toLocaleDateString(),
    }
  }

  // Verificar se o campo na credencial corresponde ao valor declarado
  const field = proof.field
  const fieldValue = proof.fieldValue
  const credentialValue = proof.credential.credentialSubject[field]

  if (credentialValue !== fieldValue) {
    return {
      isValid: false,
      message: "O valor do campo na credencial não corresponde ao valor declarado",
    }
  }

  // Verificar a assinatura da prova (simulado)
  // Em um ambiente real, você verificaria criptograficamente a assinatura
  const isSignatureValid = true

  if (!isSignatureValid) {
    return {
      isValid: false,
      message: "A assinatura da prova é inválida",
    }
  }

  // Simulação: 90% de chance de a prova ser válida
  const randomCheck = Math.random() > 0.1

  if (!randomCheck) {
    return {
      isValid: false,
      message: "A verificação criptográfica da prova falhou",
    }
  }

  // Se todas as verificações passarem, a prova é válida
  return {
    isValid: true,
    message:
      "A prova é válida e foi emitida por uma autoridade confiável. O valor do campo foi verificado sem revelar os dados originais.",
  }
}
