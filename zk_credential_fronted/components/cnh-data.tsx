import type { CNHDataType } from "@/lib/types"

interface CNHDataProps {
  data: CNHDataType
}

export function CNHData({ data }: CNHDataProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Dados Extraídos da CNH</h2>
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nome</p>
            <p className="font-medium">{data.nome}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">CPF</p>
            <p className="font-medium">{data.cpf}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Documento de Identidade</p>
            <p className="font-medium">{data.docIdentidade}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Número da CNH</p>
            <p className="font-medium">{data.numeroCNH}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data de Nascimento</p>
            <p className="font-medium">{data.dataNascimento}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Filiação</p>
            <p className="font-medium">{data.filiacao}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data de Emissão</p>
            <p className="font-medium">{data.dataEmissao}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data de Validade</p>
            <p className="font-medium">{data.dataValidade}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Categoria</p>
            <p className="font-medium">{data.categoria}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">UF</p>
            <p className="font-medium">{data.uf}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Verifique se os dados extraídos estão corretos antes de gerar a prova zero-knowledge.</p>
      </div>
    </div>
  )
}
