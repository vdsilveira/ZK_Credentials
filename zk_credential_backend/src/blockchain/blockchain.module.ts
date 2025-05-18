import { Module } from '@nestjs/common'
import { EthersProvider } from './ethers-provider'


@Module({
  providers: [EthersProvider], // TODO: adicionar modulo para Dot env
 
  exports: [EthersProvider],
})
export class BlockchainModule {}
