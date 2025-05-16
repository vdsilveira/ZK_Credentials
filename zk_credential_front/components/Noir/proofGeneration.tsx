import { UltraPlonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import fs from "fs/promises";
import path from "path";

async function generateAndVerifyProof(
  circuitDir: string,
  input: any,
  logFn?: (isFinal: boolean, message: string) => void,
  onFinish?: () => void
): Promise<{
  proofHex: string;
  publicInputs: any;
  vkHex: string;
} | null> {
  try {
    const abiPath = path.join(process.cwd(), circuitDir + ".json");
    const acirPath = path.join(process.cwd(), circuitDir + ".acir");

    const [abiContent, acirBuffer] = await Promise.all([
      fs.readFile(abiPath, "utf-8"),
      fs.readFile(acirPath),
    ]);

    const abi = JSON.parse(abiContent);

    const backend = new UltraPlonkBackend(acirBuffer);
    const noir = new Noir({abi, acirBuffer, backend});
    await noir.init();

    const { witness } = await noir.execute(input);
    const { proof, publicInputs } = await backend.generateProof(witness);

    logFn?.(false, "Prova gerada. Verificando... ⌛");

    const isValid = await backend.verifyProof({ proof, publicInputs });
    if (!isValid) throw new Error("Prova inválida.");

    logFn?.(false, "Prova válida ✅");

    const proofHex = "0x" + Buffer.from(proof).toString("hex");
    const vk = await backend.getVerificationKey();
    const vkHex = "0x" + Buffer.from(vk).toString("hex");

    logFn?.(true, `Prova (hex): ${proofHex}`);
    logFn?.(true, `Chave de verificação (hex): ${vkHex}`);

    return { proofHex, publicInputs, vkHex };
  } catch (err) {
    logFn?.(false, "Erro ao gerar/verificar prova 💔");
    console.error("Falha na geração da prova:", err);
    return null;
  } finally {
    onFinish?.();
  }
}
// --- Funções específicas com inputs mockados ---

export async function generate_BirthdayProof(
  logFn?: (isFinal: boolean, message: string) => void,
  onFinish?: () => void
) {
  const input = {
    birth_year: 1980,
    current_year: 2025,
  };

  return await generateAndVerifyProof(
    "../Noir_circuits/Birthday_proof/target/Birthday_proof",
    input,
    logFn,
    onFinish
  );
}

export async function generate_Category_proof(
  logFn?: (isFinal: boolean, message: string) => void,
  onFinish?: () => void
) {
  const input = {
    driver_category: ["b"],
    required_letter: "b",
  };

  return await generateAndVerifyProof(
    "../Noir_circuits/Category_proof/target/Category_proof",
    input,
    logFn,
    onFinish
  );
}

export async function generate_CPF_Access_proof(
  cpf: number,
  logFn?: (isFinal: boolean, message: string) => void,
  onFinish?: () => void
) {
  const input = {
    accessList: [111111111, 222222222, 123456789,444444444, 555555555],
    cpf,
  };
 

  return await generateAndVerifyProof(
    "../Noir_circuits/CPF_Access_proof/target/CPF_Access_proof",
    input,
    logFn,
    onFinish
  );
}

export async function generate_Validity_proof(
  logFn?: (isFinal: boolean, message: string) => void,
  onFinish?: () => void
) {
  const input = {
    emission: 20230917,
    today: 20250515,
  };

  return await generateAndVerifyProof(
    "../Noir_circuits/Validity_proof/target/Validity_proof",
    input,
    logFn,
    onFinish
  );
}

export default {
  generate_BirthdayProof,
  generate_Category_proof,
  generate_CPF_Access_proof,
  generate_Validity_proof,
};
