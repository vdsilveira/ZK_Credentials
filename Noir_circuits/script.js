import fs from "fs";
import { Barretenberg } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";

async function main() {
  // Leia o ABI JSON (arquivo JSON separado do .acir)
  const abiJSON = JSON.parse(fs.readFileSync("./Validity_proof/target/Validity_proof.json", "utf8"));
  
  // Leia o ACIR binário (descompactado)
  const acirBuffer = fs.readFileSync("./Validity_proof/target/Validity_proof.acir"); // ou descompacte seu .gz e renomeie para .acir

  const backend = new Barretenberg();
  const noir = new Noir(abiJSON, acirBuffer, backend);

  await noir.init();

  const input = {
    emission: "20230917",
    today: "20250515"
  };

  // execute gera prova e retorna ela
  const proof = await noir.execute(input);

  console.log("Proof:", proof);
}

main().catch(console.error);
