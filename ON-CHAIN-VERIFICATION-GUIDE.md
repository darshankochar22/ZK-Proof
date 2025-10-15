# 🎯 On-Chain ZK Proof Verification Guide

## ✅ Deployment Complete!

Your ZK-SNARK verifier contract is now **live on Sepolia testnet**:

```
📍 Contract Address: 0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95
🌐 Network: Sepolia (Chain ID: 11155111)
👤 Deployer: 0x5C54f0012e7718c9f22823B0A7845372DDe17903
⏰ Deployed: 2025-10-14T13:08:28.103Z
```

**View on Etherscan:**
https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95

---

## 🚀 How to Verify Proofs On-Chain

### **Method 1: Using the Web App (Easiest)**

#### **Step 1: Copy deployment info to public folder**

```bash
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
cp deployment-info.json public/
```

#### **Step 2: Start the web app**

```bash
npm run dev
```

The app will open at `http://localhost:5173`

#### **Step 3: Navigate to Blockchain Verifier**

- Click on **"⛓️ Blockchain Verifier"** button on home page
- Or go directly to: `http://localhost:5173/blockchain`

#### **Step 4: Connect MetaMask**

1. **Install MetaMask** (if not installed):

   - Go to https://metamask.io/download/
   - Add to your browser

2. **Switch to Sepolia Network**:

   - Open MetaMask
   - Click network dropdown (top left)
   - Select "Sepolia test network"
   - If not visible, go to Settings → Advanced → Show test networks

3. **Get Test ETH** (free):

   - Visit: https://sepoliafaucet.com/
   - Or: https://www.alchemy.com/faucets/ethereum-sepolia
   - Enter your wallet address
   - Receive 0.5 test ETH (takes 1-2 minutes)

4. **Connect Wallet**:
   - Click "🦊 Connect MetaMask" button
   - Approve connection in MetaMask popup
   - Your wallet info will appear

#### **Step 5: Generate & Submit Proof**

1. **Enter a secret number** (e.g., `12345`)
2. Click **"🚀 Generate & Submit to Blockchain"**
3. **Wait for proof generation** (~5 seconds)
4. **Approve transaction** in MetaMask popup
5. **Wait for confirmation** (~15-30 seconds)
6. **Success!** You'll see:
   - ✅ Proof verified and stored on blockchain!
   - Transaction hash
   - Link to view on Etherscan

#### **Step 6: View Your Proof on Etherscan**

Click the **"View on Etherscan →"** button to see:

- Transaction details
- Gas used
- Block number
- Timestamp
- Contract interaction

---

### **Method 2: Using Hardhat Script (Advanced)**

Create a verification script:

```bash
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
```

Create `scripts/verify-on-chain.cjs`:

```javascript
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");
const fs = require("fs");

async function main() {
  // Load deployment info
  const deploymentInfo = JSON.parse(
    fs.readFileSync("deployment-info.json", "utf8")
  );

  console.log("🔐 Generating ZK proof...");

  // Your secret number
  const secret = 12345;

  // Generate proof
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { secret },
    "circuit_js/circuit.wasm",
    "circuit_0000.zkey"
  );

  console.log("✅ Proof generated!");
  console.log("Public output (hash):", publicSignals[0]);

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
  const contract = await ethers.getContractAt(
    "ZKProofVerifier",
    deploymentInfo.contractAddress,
    signer
  );

  console.log("\n📡 Submitting proof to blockchain...");
  console.log("Contract:", deploymentInfo.contractAddress);
  console.log("Network:", deploymentInfo.network);

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
    console.log("Transaction hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());
    console.log(
      "\nView on Etherscan:",
      `https://sepolia.etherscan.io/tx/${tx.hash}`
    );

    // Get total proofs
    const totalProofs = await contract.getTotalProofs();
    console.log("\n📊 Total proofs stored:", totalProofs.toString());
  } else {
    console.log("❌ Transaction failed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Run it:

```bash
npm run verify:sepolia
```

Or add to `package.json`:

```json
{
  "scripts": {
    "verify:sepolia": "hardhat --config hardhat.config.cjs run scripts/verify-on-chain.cjs --network sepolia"
  }
}
```

---

### **Method 3: Direct Contract Interaction (Etherscan)**

1. **Go to your contract on Etherscan:**
   https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95

2. **Click "Contract" tab → "Write Contract"**

3. **Click "Connect to Web3"** (connects MetaMask)

4. **Generate proof locally** (using web app or script)

5. **Call `verifyAndStore` function** with:

   - `pA`: `[proof.pi_a[0], proof.pi_a[1]]`
   - `pB`: `[[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]]`
   - `pC`: `[proof.pi_c[0], proof.pi_c[1]]`
   - `pubSignals`: `[publicSignals[0]]`

6. **Click "Write"** and approve transaction

---

## 📊 Contract Functions

Your deployed contract has these functions:

### **Write Functions (require gas)**

```solidity
// Verify and store a proof on-chain
function verifyAndStore(
    uint256[2] memory pA,
    uint256[2][2] memory pB,
    uint256[2] memory pC,
    uint256[1] memory pubSignals
) public returns (bool)
```

### **Read Functions (free)**

```solidity
// Get total number of proofs stored
function getTotalProofs() public view returns (uint256)

// Get latest N proof hashes
function getLatestProofs(uint256 count) public view returns (bytes32[] memory)

// Get proof details by hash
function getProof(bytes32 proofHash) public view returns (
    address prover,
    uint256 publicHash,
    uint256 timestamp,
    bool isValid
)
```

---

## 🔍 Verify Proof Storage

After submitting a proof, check it was stored:

### **Using Web App:**

The app automatically shows "Total Proofs" count after each submission.

### **Using Hardhat Console:**

```bash
npx hardhat console --network sepolia
```

```javascript
const contract = await ethers.getContractAt(
  "ZKProofVerifier",
  "0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95"
);

// Get total proofs
const total = await contract.getTotalProofs();
console.log("Total proofs:", total.toString());

// Get latest 5 proofs
const latest = await contract.getLatestProofs(5);
console.log("Latest proofs:", latest);

// Get specific proof details
const proofDetails = await contract.getProof(latest[0]);
console.log("Proof details:", proofDetails);
```

### **Using Etherscan:**

1. Go to contract page
2. Click "Contract" → "Read Contract"
3. Call `getTotalProofs()` to see count
4. Call `getLatestProofs(5)` to see recent proof hashes

---

## 🎯 What Happens On-Chain?

When you submit a proof:

1. **Proof is verified** using Groth16 algorithm (gas: ~250,000)
2. **If valid**, proof details are stored:
   - Prover address (your wallet)
   - Public hash (output of your secret)
   - Timestamp (block timestamp)
   - Validity flag (true)
3. **Event is emitted**: `ProofVerified`
4. **Proof hash is added** to the proofs array

**Your secret NEVER touches the blockchain!** Only the proof and public output are stored.

---

## 💰 Gas Costs (Sepolia Testnet)

| Operation            | Gas Used   | Cost (test ETH) |
| -------------------- | ---------- | --------------- |
| Deploy Contract      | ~2,500,000 | ~0.001 ETH      |
| Verify & Store Proof | ~250,000   | ~0.0001 ETH     |
| Read Functions       | 0          | FREE            |

**Note:** These are test ETH values. On mainnet, multiply by actual gas prices.

---

## 🔗 Useful Links

### **Your Contract:**

- **Etherscan:** https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95
- **Network:** Sepolia Testnet
- **Chain ID:** 11155111

### **Get Test ETH:**

- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://sepolia-faucet.pk910.de/

### **Tools:**

- **MetaMask:** https://metamask.io/
- **Etherscan:** https://sepolia.etherscan.io/
- **Hardhat:** https://hardhat.org/

---

## 🐛 Troubleshooting

### **"Contract not deployed on this network"**

**Solution:** Make sure MetaMask is on Sepolia (Chain ID: 11155111)

```bash
# Copy deployment info to public folder
cp deployment-info.json public/
```

### **"Insufficient funds for gas"**

**Solution:** Get test ETH from a faucet (see links above)

### **"Transaction failed"**

**Possible causes:**

- Invalid proof (check your circuit inputs)
- Out of gas (increase gas limit)
- Network congestion (wait and retry)

### **"MetaMask not detected"**

**Solution:** Install MetaMask browser extension from https://metamask.io/

---

## 📝 Example: Full Verification Flow

```bash
# 1. Start web app
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
cp deployment-info.json public/
npm run dev

# 2. Open browser
# Visit: http://localhost:5173/blockchain

# 3. Connect MetaMask
# - Switch to Sepolia
# - Connect wallet

# 4. Generate proof
# - Enter secret: 12345
# - Click "Generate & Submit"
# - Approve transaction
# - Wait for confirmation

# 5. View on Etherscan
# - Click "View on Etherscan"
# - See your proof stored permanently!
```

---

## 🎉 Success Checklist

- ✅ Contract deployed to Sepolia
- ✅ MetaMask installed and connected
- ✅ Test ETH in wallet
- ✅ Web app running
- ✅ Proof generated and submitted
- ✅ Transaction confirmed on Etherscan
- ✅ Proof stored on-chain forever!

---

## 🚀 Next Steps

1. **Try different secrets** - each generates a unique proof
2. **Check proof history** - use `getLatestProofs()`
3. **Build your own app** - integrate the contract into your project
4. **Deploy to mainnet** - when ready for production (costs real ETH!)

---

**Need help?** Check the other guides:

- `BLOCKCHAIN-SETUP.md` - Initial setup
- `BLOCKCHAIN-QUICKSTART.md` - Quick reference
- `DEMO-GUIDE.md` - Full demo walkthrough

**Your contract is live and ready to verify proofs! 🎯⛓️**
