import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthersProvider {
  public readonly provider: ethers.JsonRpcProvider;
  public readonly mktWallet: ethers.Wallet;
  public readonly contract: ethers.Contract;

  constructor() {
    const sepoliaUrl = 'https://ethereum-sepolia.publicnode.com';
    this.provider = new ethers.JsonRpcProvider(sepoliaUrl);

    const privateKey =
      '41aed8423655d850142db81ff34835282e7604b38187113eca51bedd731efa61';
    this.mktWallet = new ethers.Wallet(privateKey, this.provider);

    const contractAbi = [
      'function set_cnh_cpf(string cpf_prove, uint32 cnh_cpf) public',
      'function set_cnh_validaty(string validaty_prove, uint32 cnh_validaty) public',
      'function set_cnh_category(string category_prove, string cnh_category) public',
      'function set_cnh_birthday(string birthday_prove, uint32 cnh_birthday) public',

      'function get_cpf_prove(address user) public view returns (string)',
      'function get_validaty_prove(address user) public view returns (string)',
      'function get_category_prove(address user) public view returns (string)',
      'function get_birthday_prove(address user) public view returns (string)',

      'function getProves(address user) public view returns (tuple(string cpf_prove, string validaty_prove, string category_prove, string birthday_prove))',
      'function getUserInfo(address user) public view returns (tuple(uint32 cpf, uint32 validaty, string category, uint32 birthday))',
    ];

    const contractAddress = '0x7f58668495533fD0B54aFB46920F79217A42009C';

    // Aqui passe a wallet, para ter capacidade de escrever no contrato, se precisar
    this.contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      this.mktWallet,
    );
  }
}
