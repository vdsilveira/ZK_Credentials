import { BadRequestException, Controller, Param, Get } from '@nestjs/common';
import { CpfUseCase } from '../useCases/cpf_proof';

@Controller('/createProve/cpfAcessProof/:cpf_PT')
export class CpfProofController {
  constructor(private readonly cpfProof: CpfUseCase) {}

  @Get()
  async handle(@Param('cpf_PT') cpfParam: string) {
    const cpf = Number(cpfParam);

    if (isNaN(cpf)) {
      throw new BadRequestException('CPF must be a valid number');
    }

    const result = await this.cpfProof.execute({ cpf });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.error);
    }

    return {
      proof: result.value.proofHex,
    };
  }
}
