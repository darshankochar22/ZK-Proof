import { ethers, network } from "hardhat";
import fs from "fs";
import process from "process";

async function main() {
  console.log("🚀 Deploying ZK-SNARK Verifier Contract...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy the contract
  console.log("⏳ Deploying ZKProofVerifier contract...");
  const ZKProofVerifier = await ethers.getContractFactory("ZKProofVerifier");
  const verifier = await ZKProofVerifier.deploy();

  await verifier.waitForDeployment();
  const address = await verifier.getAddress();

  console.log("✅ ZKProofVerifier deployed to:", address);
  console.log("\n📋 Contract Details:");
  console.log("   Network:", hre.network.name);
  console.log("   Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
  console.log("   Contract Address:", address);
  console.log("   Deployer:", deployer.address);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: Number((await hre.ethers.provider.getNetwork()).chainId),
    contractAddress: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📄 Deployment info saved to deployment-info.json");

  // If on testnet, show explorer link
  if (hre.network.name === "sepolia") {
    console.log(
      `\n🔍 View on Etherscan: https://sepolia.etherscan.io/address/${address}`
    );
  } else if (hre.network.name === "mumbai") {
    console.log(
      `\n🔍 View on PolygonScan: https://mumbai.polygonscan.com/address/${address}`
    );
  } else if (hre.network.name === "amoy") {
    console.log(
      `\n🔍 View on PolygonScan: https://amoy.polygonscan.com/address/${address}`
    );
  }

  console.log("\n🎉 Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
