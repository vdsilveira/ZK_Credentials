import { NextRequest, NextResponse } from "next/server"; // Use 'next/server' se estiver usando App Router
import {
  generate_BirthdayProof,
  generate_Category_proof,
  generate_CPF_Access_proof,
  generate_Validity_proof,
} from "../../../components/Noir/proofGeneration";

export async function POST(req: NextRequest) {
  try {
    const { field } = await req.json();

    if (!field) {
      return NextResponse.json({ error: "Campo 'field' é obrigatório." }, { status: 400 });
    }

    let proofResult = null;

    switch (field) {
      case "dataNascimento":
        proofResult = await generate_BirthdayProof();
        break;

      case "categoria":
        proofResult = await generate_Category_proof();
        break;

      case "cpf":
        proofResult = await generate_CPF_Access_proof(123456789);
        break;

      case "dataValidade":
        proofResult = await generate_Validity_proof();
        break;

      default:
        return NextResponse.json({ error: `Campo '${field}' não possui geração de prova implementada.` }, { status: 400 });
    }

    if (!proofResult) {
      return NextResponse.json({ error: "Falha na geração/verificação da prova." }, { status: 500 });
    }

    return NextResponse.json({ result: proofResult }, { status: 200 });

  } catch (err: any) {
    console.error("Erro no endpoint de prova:", err);
    return NextResponse.json({ error: err?.message || "Erro interno na API de prova." }, { status: 500 });
  }
}
