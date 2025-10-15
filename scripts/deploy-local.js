import { ethers } from "hardhat";
import fs from "fs";
import process from "process";

async function main() {
  console.log("🏠 Deploying to Local Hardhat Network...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ZKProofVerifier = await ethers.getContractFactory("ZKProofVerifier");
  const verifier = await ZKProofVerifier.deploy();
  await verifier.waitForDeployment();

  const address = await verifier.getAddress();
  console.log("✅ ZKProofVerifier deployed to:", address);

  // Save for local testing
  fs.writeFileSync(
    "deployment-local.json",
    JSON.stringify(
      {
        contractAddress: address,
        network: "localhost",
        chainId: 31337,
      },
      null,
      2
    )
  );

  console.log("\n✅ Ready for local testing!");
  console.log("📝 Contract address saved to deployment-local.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
