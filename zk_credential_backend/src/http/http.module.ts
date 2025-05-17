import { Module } from '@nestjs/common'
import { CpfProofController } from '../controllers/cpr_proveController'
import { CpfUseCase } from '../useCases/cpf_proof';
import { BlockchainModule } from '../blockchain/blockchain.module'
@Module({
  imports: [ BlockchainModule],
  controllers: [
    CpfProofController,
 
  ],
  providers: [
    CpfUseCase,
   
  ],
})
export class HttpModule {}
