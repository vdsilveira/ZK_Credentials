import { type NextRequest, NextResponse } from "next/server"
import type { CNHDataType, ProofResultType, FieldProof } from "@/lib/types"
import crypto from "crypto"

// Importação simulada da biblioteca snarkjs
// Em um ambiente real, você importaria a biblioteca real
// import * as snarkjs from "snarkjs";

export async function POST(request: NextRequest) {
  try {
    const { cnh, walletAddress, fields } = await request.json()

    if (!cnh || !walletAddress || !fields || !Array.isArray(fields)) {
      return NextResponse.json({ message: "Dados inválidos para geração da prova" }, { status: 400 })
    }

    // Verificar se os campos selecionados são válidos
    const validFields = ["nome", "cpf", "numeroCNH", "dataNascimento", "dataEmissao", "dataValidade", "categoria", "uf"]

    const invalidFields = fields.filter((field) => !validFields.includes(field))

    if (invalidFields.length > 0) {
      return NextResponse.json({ message: `Campos inválidos: ${invalidFields.join(", ")}` }, { status: 400 })
    }

    // Gerar provas individuais para cada campo selecionado
    const fieldProofs: FieldProof[] = []

    for (const field of fields) {
      // Obter o valor do campo da CNH
      const fieldValue = cnh[field as keyof CNHDataType]

      // Gerar a prova zero-knowledge para este campo específico
      const proof = await generateZKProofForField(field, fieldValue, walletAddress)

      // Criar a credencial verificável para este campo
      const credential = createVerifiableCredentialForField(field, fieldValue, walletAddress, proof)

      // Adicionar à lista de provas
      fieldProofs.push({
        field,
        fieldValue,
        proof,
        credential,
      })
    }

    // Gerar um ID de pacote para todas as provas
    const bundleId = crypto.randomUUID()

    // Retornar o resultado
    const result: ProofResultType = {
      walletAddress,
      fieldProofs,
      bundleId,
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Erro ao gerar prova:", error)
    return NextResponse.json({ message: "Erro ao gerar a prova zero-knowledge: " + error.message }, { status: 500 })
  }
}

// Função para gerar a prova zero-knowledge para um campo específico
async function generateZKProofForField(field: string, fieldValue: string, walletAddress: string) {
  // Em um ambiente real, você usaria a biblioteca snarkjs para gerar a prova
  // Aqui estamos simulando a geração da prova

  // Simulação de geração de prova
  const timestamp = new Date().toISOString()
  const proofValue = crypto
    .createHash("sha256")
    .update(JSON.stringify({ field, fieldValue, walletAddress, timestamp }))
    .digest("base64")

  return {
    type: "ZKProof2023",
    proofValue,
    created: timestamp,
    proofPurpose: "assertionMethod",
    verificationMethod: "did:example:issuer#zk-key-1",
  }
}

// Função para criar a credencial verificável para um campo específico
function createVerifiableCredentialForField(field: string, fieldValue: string, walletAddress: string, proof: any) {
  const now = new Date()
  const issuanceDate = now.toISOString()

  // Data de expiração (1 ano a partir de agora)
  const expirationDate = new Date(now)
  expirationDate.setFullYear(now.getFullYear() + 1)

  // Criar o objeto credentialSubject com apenas o campo específico
  const credentialSubject: any = {
    id: `did:ethr:${walletAddress}`,
    type: "CNHCredential",
  }

  // Adicionar o campo específico
  credentialSubject[field] = fieldValue

  // Criar a credencial verificável
  return {
    "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
    id: `urn:uuid:${crypto.randomUUID()}`,
    type: ["VerifiableCredential", "CNHCredential", `CNH${field.charAt(0).toUpperCase() + field.slice(1)}Credential`],
    issuer: "did:example:issuer",
    issuanceDate,
    expirationDate: expirationDate.toISOString(),
    credentialSubject,
    proof,
  }
}
