export interface CNHDataType {
  nome: string
  cpf: string
  numeroCNH: string
  dataNascimento: string
  dataEmissao: string
  dataValidade: string
  categoria: string
  uf: string
  docIdentidade: string
  filiacao: string
}

export interface FieldProof {
  field: string
  fieldValue: string
  proof: {
    type: string
    proofValue: string
    created: string
    proofPurpose: string
    verificationMethod: string
  }
  credential: {
    "@context": string[]
    id: string
    type: string[]
    issuer: string
    issuanceDate: string
    expirationDate: string
    credentialSubject: {
      id: string
      type: string
      [key: string]: any
    }
    proof: {
      type: string
      proofValue: string
      created: string
      proofPurpose: string
      verificationMethod: string
    }
  }
}

export interface ProofResultType {
  walletAddress: string
  fieldProofs: FieldProof[]
  bundleId: string
  externalProof?: string
}
