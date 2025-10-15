const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");
const fs = require("fs");

async function main() {
  // Load deployment info
  const deploymentInfo = JSON.parse(
    fs.readFileSync("deployment-info.json", "utf8")
  );

  console.log("🔐 Generating ZK proof...");
  console.log("Contract:", deploymentInfo.contractAddress);
  console.log("Network:", deploymentInfo.network);
  console.log("");

  // Your secret number
  const secret = process.argv[2] || 12345;
  console.log("Secret number:", secret);

  // Generate proof
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { secret: parseInt(secret) },
    "circuit_js/circuit.wasm",
    "circuit_0000.zkey"
  );

  console.log("✅ Proof generated!");
  console.log("Public output (hash):", publicSignals[0]);
  console.log("");

  // Format for Solidity
  const formattedProof = [
    [proof.pi_a[0], proof.pi_a[1]],
    [
      [proof.pi_b[0][1], proof.pi_b[0][0]],
      [proof.pi_b[1][1], proof.pi_b[1][0]],
    ],
    [proof.pi_c[0], proof.pi_c[1]],
  ];

  const formattedPublicSignals = [publicSignals[0]];

  // Connect to contract
  const [signer] = await ethers.getSigners();
  console.log("📝 Submitting from account:", signer.address);

  const contract = await ethers.getContractAt(
    "ZKProofVerifier",
    deploymentInfo.contractAddress,
    signer
  );

  console.log("\n📡 Submitting proof to blockchain...");

  // Submit proof
  const tx = await contract.verifyAndStore(
    formattedProof[0],
    formattedProof[1],
    formattedProof[2],
    formattedPublicSignals
  );

  console.log("⏳ Transaction submitted:", tx.hash);
  console.log("Waiting for confirmation...");

  const receipt = await tx.wait();

  if (receipt.status === 1) {
    console.log("\n✅ SUCCESS! Proof verified and stored on-chain!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Transaction hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());
    console.log(
      "\n🔍 View on Etherscan:",
      `https://sepolia.etherscan.io/tx/${tx.hash}`
    );

    // Get total proofs
    const totalProofs = await contract.getTotalProofs();
    console.log("\n📊 Total proofs stored:", totalProofs.toString());

    // Get latest proofs
    const latestProofs = await contract.getLatestProofs(5);
    console.log("Latest 5 proof hashes:");
    latestProofs.forEach((hash, i) => {
      console.log(`  ${i + 1}. ${hash}`);
    });
  } else {
    console.log("❌ Transaction failed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
