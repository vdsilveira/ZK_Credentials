import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import type { FieldProof } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, proofType } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ message: "Endereço da carteira não fornecido" }, { status: 400 })
    }

    if (!proofType) {
      return NextResponse.json({ message: "Tipo de prova não fornecido" }, { status: 400 })
    }

    // Validar o tipo de prova
    const validProofTypes = [
      "nome",
      "cpf",
      "numeroCNH",
      "dataNascimento",
      "dataValidade",
      "categoria",
      "uf",
      "docIdentidade",
      "filiacao",
    ]

    if (!validProofTypes.includes(proofType)) {
      return NextResponse.json({ message: "Tipo de prova inválido" }, { status: 400 })
    }

    // Em um ambiente real, você buscaria a prova em um banco de dados ou blockchain
    // Aqui estamos simulando a recuperação da prova

    // Verificar se existe uma prova para este endereço e tipo
    // Simulação: gerar uma prova aleatória para demonstração
    const proof = generateMockProof(walletAddress, proofType)

    if (!proof) {
      return NextResponse.json(
        { message: "Nenhuma prova encontrada para este endereço e tipo de prova" },
        { status: 404 },
      )
    }

    return NextResponse.json(proof)
  } catch (error: any) {
    console.error("Erro ao recuperar prova:", error)
    return NextResponse.json({ message: "Erro ao recuperar a prova: " + error.message }, { status: 500 })
  }
}

// Função para gerar uma prova simulada para fins de demonstração
function generateMockProof(walletAddress: string, proofType: string): FieldProof {
  // Gerar valores simulados com base no tipo de prova
  let fieldValue = ""
  switch (proofType) {
    case "nome":
      fieldValue = "EDUARDO AUGUSTO DA SILVA"
      break
    case "cpf":
      fieldValue = "999.999.999-99"
      break
    case "numeroCNH":
      fieldValue = "9999999999"
      break
    case "dataNascimento":
      fieldValue = "01/01/1980"
      break
    case "dataValidade":
      fieldValue = "24/02/2020"
      break
    case "categoria":
      fieldValue = "B"
      break
    case "uf":
      fieldValue = "MG"
      break
    case "docIdentidade":
      fieldValue = "M9999999 SSP MG"
      break
    case "filiacao":
      fieldValue = "JOSE DA SILVA, MARIA PEREIRA DA SILVA"
      break
    default:
      fieldValue = "Valor desconhecido"
  }

  // Gerar timestamp e hash para simulação
  const timestamp = new Date().toISOString()
  const proofValue = crypto
    .createHash("sha256")
    .update(JSON.stringify({ proofType, fieldValue, walletAddress, timestamp }))
    .digest("base64")

  // Criar a prova simulada
  return {
    field: proofType,
    fieldValue,
    proof: {
      type: "ZKProof2023",
      proofValue,
      created: timestamp,
      proofPurpose: "assertionMethod",
      verificationMethod: "did:example:issuer#zk-key-1",
    },
    credential: {
      "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
      id: `urn:uuid:${crypto.randomUUID()}`,
      type: [
        "VerifiableCredential",
        "CNHCredential",
        `CNH${proofType.charAt(0).toUpperCase() + proofType.slice(1)}Credential`,
      ],
      issuer: "did:example:issuer",
      issuanceDate: timestamp,
      expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      credentialSubject: {
        id: `did:ethr:${walletAddress}`,
        type: "CNHCredential",
        [proofType]: fieldValue,
      },
      proof: {
        type: "ZKProof2023",
        proofValue,
        created: timestamp,
        proofPurpose: "assertionMethod",
        verificationMethod: "did:example:issuer#zk-key-1",
      },
    },
  }
}
