export interface CNHDataType {
  nome: string
  cpf: string
  registroCNH: string
  dataNascimento: string
  dataEmissao: string
  dataValidade: string
  categoria: string
  uf: string
}

export interface ZKProof {
  a: [string, string]
  b: [[string, string], [string, string]]
  c: [string, string]
  input: [string]
}

export interface FieldProof {
  field: string
  fieldValue: string
  proof: ZKProof
  proofId: number
  isValid: boolean
  credential?: {
    id: string
    type: string[]
    issuanceDate: string
    expirationDate: string
    credentialSubject: any
  }
}

export interface ProofResultType {
  walletAddress: string
  fieldProofs: FieldProof[]
  bundleId: string
}
