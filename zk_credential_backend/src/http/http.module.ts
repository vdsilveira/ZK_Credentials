import { Module } from '@nestjs/common';
import { CpfProofController } from '../controllers/cpf_proveController';
import { web3_cpfProofController } from '../controllers/web3CpfProof.controller';
import { CpfUseCase } from '../useCases/cpf_proof';
import { web3_cpfUseCase } from '../useCases/web3_cpfProof';
import { BlockchainModule } from '../blockchain/blockchain.module';
@Module({
  imports: [BlockchainModule],
  controllers: [CpfProofController, web3_cpfProofController],
  providers: [CpfUseCase, web3_cpfUseCase],
})
export class HttpModule {}
