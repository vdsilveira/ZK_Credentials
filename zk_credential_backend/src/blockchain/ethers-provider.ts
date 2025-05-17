import { ethers, JsonRpcProvider, parseEther, Wallet } from 'ethers'

import { Injectable } from '@nestjs/common'


@Injectable()
export class EthersProvider {
  provider: JsonRpcProvider
  mktWallet: Wallet

  constructor() {
    const sepoliUrl = 'https://ethereum-sepolia.publicnode.com'
    this.provider = new JsonRpcProvider(sepoliUrl)

    const privateKey = '41aed8423655d850142db81ff34835282e7604b38187113eca51bedd731efa61'
    this.mktWallet = new Wallet(privateKey, this.provider)


   
  }

  



  
  



  


  
}
