import { Injectable } from '@nestjs/common';
import { Either, right, left } from '../types/either/either';
import { EthersProvider } from '../blockchain/ethers-provider';
import * as fs from 'fs';
import * as path from 'path';
import { Barretenberg } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';

interface CpfUseCaseRequest {
  cpf: number;
}

type CpfUseCaseResponse = Either<
  { error: string },
  {
    proofHex: string;
  }
>;

@Injectable()
export class CpfUseCase {
  constructor(private readonly ethersProvider: EthersProvider) {}

  async execute({ cpf }: CpfUseCaseRequest): Promise<CpfUseCaseResponse> {
    try {
      // Caminho para os arquivos do circuito Noir
      const basePath = path.resolve(
        process.cwd(),
        'src/Noir_circuits/CPF_Access_proof/target'
      );

      const jsonPath = path.join(basePath, 'CPF_Access_proof.json');
      const acirPath = path.join(basePath, 'CPF_Access_proof.acir');

      console.log('JSON path:', jsonPath);
      console.log('ACIR path:', acirPath);

      if (!fs.existsSync(jsonPath) || !fs.existsSync(acirPath)) {
        const missing: string[] = [];
        if (!fs.existsSync(jsonPath)) missing.push('CPF_Access_proof.json');
        if (!fs.existsSync(acirPath)) missing.push('CPF_Access_proof.acir');

        return left({
          error: `Arquivo(s) ausente(s): ${missing.join(', ')}`
        });
      }

      const abiJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const acirBuffer = fs.readFileSync(acirPath);

      console.log('Arquivos carregados, iniciando Barretenberg...');
      const backend = await Barretenberg.new();

      console.log('Iniciando Noir...');
      const noir = new Noir(abiJSON);
      await noir.init();

      const input = {
        accessList: [111111111, 222222222, 123456789, 444444444, 555555555],
        cpf
      };

      console.log('Executando prova com input:', input);
      const proof = await noir.execute(input);

      console.log('Prova gerada com sucesso');

      const proofHex = Buffer.from(proof.witness).toString('hex');
      console.log('Proof (hex):', proofHex);

      return right({
        proofHex
      });
    } catch (err: any) {
      console.error('Erro ao gerar prova:', err);
      return left({
        error: 'Erro ao gerar prova: ' + (err.message || err.toString()),
      });
    }
  }
}
