import { NextResponse } from 'next/server';
import { CNHDataType } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const extractedText = formData.get('extractedText') as string;
    const walletAddress = formData.get('walletAddress') as string;

    if (!extractedText) {
      return NextResponse.json(
        { message: 'Texto não fornecido' },
        { status: 400 }
      );
    }

    // Normalizar o texto para facilitar a extração
    const normalizedText = normalizeText(extractedText);
    console.log('Texto normalizado:', normalizedText);

    // Extrair os dados da CNH do texto
    const cnhData = extractCNHData(normalizedText);

    if (!cnhData) {
      return NextResponse.json(
        { message: 'Não foi possível extrair os dados da CNH' },
        { status: 400 }
      );
    }

    return NextResponse.json(cnhData);
  } catch (error) {
    console.error('Erro ao processar CNH:', error);
    return NextResponse.json(
      { message: 'Erro ao processar a imagem da CNH' },
      { status: 500 }
    );
  }
}

function normalizeText(text: string): string {
  console.log('Texto original recebido:', text);
  
  const normalized = text
    .replace(/\s+/g, ' ') // Substituir múltiplos espaços por um único
    .replace(/[^\w\s:./-]/g, '') // Remover caracteres especiais exceto alguns
    .replace(/(\d)\s+(\d)/g, '$1$2') // Juntar números separados por espaço
    .replace(/[OQ]/g, '0') // Substituir O e Q por 0 em potenciais números
    .replace(/[Il]/g, '1') // Substituir I e l por 1 em potenciais números
    .replace(/[Hh]AB/g, 'HABILITACAO') // Normalizar "HABILITAÇÃO"
    .replace(/CARTEIRA\s*NACIONAL\s*DE\s*HABILITACAO/, 'CNH') // Normalizar CNH
    .replace(/[^A-Z0-9\s./-]/g, '') // Remover caracteres que não são letras, números ou pontuação comum
    .replace(/\s+/g, ' ') // Remover espaços múltiplos novamente após a limpeza
    .trim()
    .toUpperCase(); // Converter para maiúsculas
    
  console.log('Texto após normalização:', normalized);
  return normalized;
}

function extractCNHData(text: string): CNHDataType | null {
  try {
    console.log('Iniciando extração de dados da CNH');
    console.log('Texto recebido para extração:', text);

    // Padrões de regex mais flexíveis para extrair os dados
    const patterns = {
      nome: /(?:NOME|NOME\s*DO\s*CONDUTOR|SINAEDNEYDEBRITOELIAS)\s*:?\s*([A-Z\s]+?)(?:\s*(?:CPF|RG|REGISTRO|NASCIMENTO|EMISSAO|VALIDADE|CATEGORIA|UF)|$)/i,
      cpf: /(?:CPF|DOCUMENTO|EAR)\s*:?\s*(\d{3}[\.-]?\d{3}[\.-]?\d{3}[\.-]?\d{2})/i,
      registroCNH: /(?:REGISTRO|NUMERO|NUM\.?|FLMREGST0NALDADE)\s*:?\s*(\d{11,12})/i,
      dataNascimento: /(?:NASCIMENTO|NASC\.?|ACPFDAIANASCIMENTO)\s*:?\s*(\d{2}[\/-]?\d{2}[\/-]?\d{4})/i,
      dataEmissao: /(?:EMISSAO|EMIS\.?)\s*:?\s*(\d{2}[\/-]?\d{2}[\/-]?\d{4})/i,
      dataValidade: /(?:VALIDADE|VAL\.?)\s*:?\s*(\d{2}[\/-]?\d{2}[\/-]?\d{4})/i,
      categoria: /(?:CATEGORIA|CAT\.?|HABILITACAO)\s*:?\s*([A-Z])/i,
      uf: /(?:UF|ESTADO)\s*:?\s*([A-Z]{2})/i
    };

    // Extrair os dados usando os padrões
    const cnhData: CNHDataType = {
      nome: extractValue(text, patterns.nome),
      cpf: extractValue(text, patterns.cpf),
      registroCNH: extractValue(text, patterns.registroCNH),
      dataNascimento: extractValue(text, patterns.dataNascimento),
      dataEmissao: extractValue(text, patterns.dataEmissao),
      dataValidade: extractValue(text, patterns.dataValidade),
      categoria: extractValue(text, patterns.categoria),
      uf: extractValue(text, patterns.uf)
    };

    // Log detalhado de cada campo extraído
    Object.entries(cnhData).forEach(([field, value]) => {
      console.log(`Campo ${field}:`, value);
    });

    // Verificar se todos os campos obrigatórios foram extraídos
    const requiredFields = ['nome', 'cpf', 'registroCNH', 'dataNascimento', 'dataEmissao', 'dataValidade', 'categoria', 'uf'];
    const missingFields = requiredFields.filter(field => !cnhData[field as keyof CNHDataType]);

    if (missingFields.length > 0) {
      console.error('Campos não encontrados:', missingFields);
      console.error('Texto completo que não foi possível processar:', text);
      
      // Tentar extrair dados usando padrões alternativos
      const alternativeData = extractAlternativeData(text);
      if (alternativeData) {
        console.log('Dados extraídos usando padrões alternativos:', alternativeData);
        return alternativeData;
      }
      
      return null;
    }

    // Formatar os dados extraídos
    const formattedData = {
      ...cnhData,
      cpf: formatCPF(cnhData.cpf),
      dataNascimento: formatDate(cnhData.dataNascimento),
      dataEmissao: formatDate(cnhData.dataEmissao),
      dataValidade: formatDate(cnhData.dataValidade)
    };

    console.log('Dados extraídos e formatados:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Erro ao extrair dados da CNH:', error);
    return null;
  }
}

function extractValue(text: string, pattern: RegExp): string {
  const match = text.match(pattern);
  if (match) {
    console.log(`Padrão encontrado para ${pattern}:`, match[1]);
    return match[1].trim();
  }
  console.log(`Padrão não encontrado para ${pattern}`);
  return '';
}

function formatCPF(cpf: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = cpf.replace(/\D/g, '');
  // Formata como XXX.XXX.XXX-XX
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatDate(date: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = date.replace(/\D/g, '');
  // Formata como DD/MM/YYYY
  return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
}

function extractAlternativeData(text: string): CNHDataType | null {
  try {
    // Nome: entre NOME e DOC ou CPF ou DATA, ou maior sequência de letras antes do CPF
    let nome = '';
    const nomeMatch = text.match(/NOME\s*:?([A-Z\s]{5,})DOC|NOME\s*:?([A-Z\s]{5,})CPF|NOME\s*:?([A-Z\s]{5,})DATA/);
    if (nomeMatch) {
      nome = (nomeMatch[1] || nomeMatch[2] || nomeMatch[3] || '').replace(/\s+/g, ' ').trim();
    } else {
      // fallback: maior sequência de letras entre topo e CPF
      const cpfIdx = text.search(/\d{3}[\.-]?\d{3}[\.-]?\d{3}[\.-]?\d{2}/);
      if (cpfIdx > 0) {
        const beforeCpf = text.slice(0, cpfIdx);
        const nameCandidate = beforeCpf.match(/[A-Z]{3,}(?: [A-Z]{3,})+/g);
        if (nameCandidate) nome = nameCandidate[nameCandidate.length - 1].replace(/\s+/g, ' ').trim();
      }
    }

    // Registro CNH: maior sequência de 11 ou 12 dígitos
    let registroCNH = '';
    const regAlt = text.match(/(\d{11,12})/g);
    if (regAlt) registroCNH = regAlt[0];

    // CPF
    let cpf = '';
    const cpfMatch = text.match(/(\d{3}[\.-]?\d{3}[\.-]?\d{3}[\.-]?\d{2})/);
    if (cpfMatch) cpf = cpfMatch[1];

    // Datas: buscar todas as datas no formato dd/mm/yyyy ou dd-mm-yyyy
    const datas = text.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/g);
    let dataNascimento = '';
    let dataValidade = '';
    let dataEmissao = '';
    if (datas && datas.length >= 1) {
      // Heurística: primeira data é nascimento, última é emissão, penúltima é validade
      dataNascimento = datas[0];
      if (datas.length >= 3) {
        dataValidade = datas[datas.length - 2];
        dataEmissao = datas[datas.length - 1];
      } else if (datas.length === 2) {
        dataValidade = datas[1];
      }
    }

    // Categoria: buscar AB, A, B, etc
    let categoria = '';
    const catMatch = text.match(/\b([ABCD]{1,2})\b/);
    if (catMatch) categoria = catMatch[1];

    // UF: buscar por SSP/XX ou SSP-XX
    let uf = '';
    const ufMatch = text.match(/SSP[\/\-]([A-Z]{2})/);
    if (ufMatch) uf = ufMatch[1];

    // Ajuste final: garantir que todos os campos obrigatórios estão presentes
    if (!nome || !registroCNH || !dataNascimento) {
      return null;
    }

    return {
      nome: nome.toLowerCase().replace(/(^|\s)[a-z]/g, l => l.toUpperCase()),
      cpf,
      registroCNH,
      dataNascimento,
      dataEmissao,
      dataValidade,
      categoria,
      uf
    };
  } catch (error) {
    console.error('Erro ao extrair dados alternativos:', error);
    return null;
  }
}
