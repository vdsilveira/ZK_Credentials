import { Injectable } from '@nestjs/common';
import { Either, right, left } from '../types/either/either';
import { EthersProvider } from '../blockchain/ethers-provider';

import { AbiCoder, hexlify } from 'ethers'; // Importe utils do ethers

interface Web3CpfUseCaseRequest {
  method: string;
  address: string;
}

type Web3CpfUseCaseResponse = Either<{ error: string }, { proofHex: string }>;

@Injectable()
export class web3_cpfUseCase {
  constructor(private readonly ethersProvider: EthersProvider) {}

  async execute(
    request: Web3CpfUseCaseRequest,
  ): Promise<Web3CpfUseCaseResponse> {
    const { address } = request;

    try {
      // Pega a instância do contrato (supondo que seja async)
      const contract = this.ethersProvider.contract;
      const tx = await contract.get_cpf_prove(address);

      // Converte o bytes (proof) para hex string
      const proofHex = tx;

      return right({ proofHex });
    } catch (error: unknown) {
      console.error('Erro ao executar Web3CpfUseCase:', error);
      return left({ error: 'Erro ao executar lógica do contrato' });
    }
  }
}
