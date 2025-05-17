import { Module } from '@nestjs/common'
import { EthersProvider } from './ethers-provider'


@Module({
  providers: [EthersProvider],
  exports: [EthersProvider],
})
export class BlockchainModule {}
