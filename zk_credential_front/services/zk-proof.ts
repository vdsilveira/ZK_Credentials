import { ethers } from 'ethers';
import CNHVerifier from '../artifacts/contracts/CNHVerifier.sol/CNHVerifier.json';

export class ZKProofService {
  private provider: ethers.providers.Web3Provider;
  private contract: ethers.Contract;

  constructor(contractAddress: string) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.contract = new ethers.Contract(
      contractAddress,
      CNHVerifier.abi,
      this.provider.getSigner()
    );
  }

  async storeProof(proof: {
    a: [string, string];
    b: [[string, string], [string, string]];
    c: [string, string];
    input: [string];
  }): Promise<number> {
    try {
      const tx = await this.contract.storeProof(
        proof.a,
        proof.b,
        proof.c,
        proof.input
      );
      const receipt = await tx.wait();
      
      // Encontrar o evento ProofStored
      const event = receipt.events?.find(e => e.event === 'ProofStored');
      return event?.args?.proofId.toNumber();
    } catch (error) {
      console.error('Erro ao armazenar prova:', error);
      throw error;
    }
  }

  async verifyProof(
    proofId: number,
    proof: {
      a: [string, string];
      b: [[string, string], [string, string]];
      c: [string, string];
      input: [string];
    }
  ): Promise<boolean> {
    try {
      const tx = await this.contract.verifyProof(
        proofId,
        proof.a,
        proof.b,
        proof.c,
        proof.input
      );
      const receipt = await tx.wait();
      
      // Encontrar o evento ProofVerified
      const event = receipt.events?.find(e => e.event === 'ProofVerified');
      return event?.args?.isValid;
    } catch (error) {
      console.error('Erro ao verificar prova:', error);
      throw error;
    }
  }
} 