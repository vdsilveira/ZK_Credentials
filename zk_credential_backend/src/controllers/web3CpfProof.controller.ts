import { Controller, Param, Get, BadRequestException } from '@nestjs/common';
import { web3_cpfUseCase } from '../useCases/web3_cpfProof';

@Controller('Consult')
export class web3_cpfProofController {
  constructor(private readonly web3cpfProof: web3_cpfUseCase) {}

  @Get(':method/:address')
  async handle(
    @Param('method') method: string,
    @Param('address') address: string,
  ) {
    // console.log('Params recebidos:', { method, address });

    const result = await this.web3cpfProof.execute({ method, address });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.error);
    }

    return {
      proofHex: result.value.proofHex,
    };
  }

  // Rota para teste simples sem parâmetros
  @Get('test')
  test() {
    return { msg: 'rota test funcionando' };
  }
}

