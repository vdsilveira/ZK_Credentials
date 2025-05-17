import fs from "fs";
import { Barretenberg } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";

async function main() {
  // Leia o ABI JSON (arquivo JSON separado do .acir)
  const abiJSON = JSON.parse(fs.readFileSync("./CPF_Access_proof.json", "utf8"));
  
  // Leia o ACIR binário (descompactado)
  const acirBuffer = fs.readFileSync("./CPF_Access_proof.acir"); // ou descompacte seu .gz e renomeie para .acir

  const backend = new Barretenberg();
  const noir = new Noir(abiJSON, acirBuffer, backend);

  await noir.init();

  const input = {
    accessList: [111111111, 222222222, 123456789,444444444, 555555555],
    cpf: 222222222
  };

  // execute gera prova e retorna ela
  const proof = await noir.execute(input);

  console.log("Proof:", proof);

  const proofHex = Buffer.from(proof.witness).toString("hex");
  console.log("Proof (hex):", proofHex);

  

}

main().catch(console.error);
