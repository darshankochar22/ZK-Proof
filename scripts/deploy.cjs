const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Deploying ZK-SNARK Verifier Contract...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  console.log("⏳ Deploying ZKProofVerifier contract...");
  const ZKProofVerifier = await hre.ethers.getContractFactory(
    "ZKProofVerifier"
  );
  const verifier = await ZKProofVerifier.deploy();

  await verifier.waitForDeployment();
  const address = await verifier.getAddress();

  console.log("✅ ZKProofVerifier deployed to:", address);
  console.log("\n📋 Contract Details:");
  console.log("   Network:", hre.network.name);
  console.log("   Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
  console.log("   Contract Address:", address);
  console.log("   Deployer:", deployer.address);

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

  // Show appropriate explorer link
  let explorerUrl;
  if (hre.network.name === "zkSyncSepolia") {
    explorerUrl = `https://sepolia.explorer.zksync.io/address/${address}`;
  } else if (hre.network.name === "sepolia") {
    explorerUrl = `https://sepolia.etherscan.io/address/${address}`;
  } else if (hre.network.name === "amoy") {
    explorerUrl = `https://amoy.polygonscan.com/address/${address}`;
  } else if (hre.network.name === "mumbai") {
    explorerUrl = `https://mumbai.polygonscan.com/address/${address}`;
  } else {
    explorerUrl = `Explorer link not available for ${hre.network.name}`;
  }
  
  console.log(`\n🔍 View on Explorer: ${explorerUrl}`);
  console.log("\n🎉 Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
