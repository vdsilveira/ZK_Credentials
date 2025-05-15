const hre = require("hardhat");

async function main() {
  // Endereço do contrato zkVerify (precisa ser substituído pelo endereço real)
  const zkVerifyAddress = process.env.ZKVERIFY_ADDRESS;

  console.log("Deployando CNHVerifier...");
  const CNHVerifier = await hre.ethers.getContractFactory("CNHVerifier");
  const verifier = await CNHVerifier.deploy(zkVerifyAddress);

  await verifier.deployed();

  console.log("CNHVerifier deployed to:", verifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 