const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🏠 Deploying to Local Hardhat Network...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ZKProofVerifier = await hre.ethers.getContractFactory(
    "ZKProofVerifier"
  );
  const verifier = await ZKProofVerifier.deploy();
  await verifier.waitForDeployment();

  const address = await verifier.getAddress();
  console.log("✅ ZKProofVerifier deployed to:", address);

  const deploymentInfo = {
    network: "localhost",
    contractAddress: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "deployment-local.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📄 Local deployment info saved to deployment-local.json");
  console.log("\n🎉 Deployment complete!");
  console.log("\n📋 Next steps:");
  console.log("1. Keep this terminal running (Hardhat node)");
  console.log("2. In MetaMask, add this network:");
  console.log("   - Network Name: Hardhat Local");
  console.log("   - RPC URL: http://127.0.0.1:8545");
  console.log("   - Chain ID: 31337");
  console.log("   - Currency Symbol: ETH");
  console.log(
    "3. Import one of the test accounts from the Hardhat node output"
  );
  console.log("4. Refresh your browser and try the Blockchain Verifier!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
