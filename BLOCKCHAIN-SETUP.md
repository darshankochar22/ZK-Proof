# ⛓️ Blockchain Integration Setup Guide

Complete guide to deploy and use your ZK-SNARK proof verifier on Ethereum!

---

## 🎯 What You'll Build

A smart contract that verifies ZK-SNARK proofs on the Ethereum blockchain, making your proofs:

- ✅ **Permanent** - Stored forever on-chain
- ✅ **Public** - Anyone can verify they exist
- ✅ **Trustless** - No need to trust the verifier
- ✅ **Timestamped** - With blockchain timestamp
- ✅ **Still Private** - Your secret never touches the blockchain!

---

## 📋 Prerequisites

### 1. Install MetaMask

Download and install the MetaMask browser extension:

- **Chrome/Brave**: https://metamask.io/download/
- **Firefox**: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/

### 2. Get Test ETH (FREE!)

We'll use **Sepolia Testnet** (Ethereum's test network):

**Step 1: Switch to Sepolia in MetaMask**

- Open MetaMask
- Click network dropdown (top)
- Enable "Show test networks" in Settings
- Select "Sepolia test network"

**Step 2: Get Free Test ETH from Faucets**

Visit any of these faucets (you'll need to sign in):

- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia
- https://faucet.quicknode.com/ethereum/sepolia

You'll receive 0.5-1 test ETH (takes ~30 seconds).

---

## 🚀 Deployment (3 Options)

### **Option 1: Quick Local Testing** (No blockchain needed)

Perfect for development and testing:

```bash
# Terminal 1: Start local blockchain
npx hardhat node

# Terminal 2: Deploy to local network
npx hardhat run scripts/deploy-local.js --network localhost

# Terminal 3: Start React app
npm run dev
```

Your contract is deployed locally! Test without spending any ETH.

---

### **Option 2: Deploy to Sepolia Testnet** (Recommended)

Deploy to real Ethereum testnet with free test ETH:

**Step 1: Get Your Private Key**

1. Open MetaMask
2. Click the 3 dots → Account Details
3. Click "Export Private Key"
4. Enter your password
5. **Copy the private key** (NEVER share this!)

**Step 2: Create `.env` File**

```bash
# In the zk-proof directory
touch .env
```

Add this to `.env`:

```
PRIVATE_KEY=your_private_key_here_without_0x
SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

**⚠️ IMPORTANT:** Never commit `.env` to git! It's already in `.gitignore`.

**Step 3: Deploy**

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected output:**

```
🚀 Deploying ZK-SNARK Verifier Contract...
📝 Deploying contracts with account: 0x1234...
✅ ZKProofVerifier deployed to: 0xABCD...
🔍 View on Etherscan: https://sepolia.etherscan.io/address/0xABCD...
```

**Step 4: Save the Contract Address**

The deployment creates `deployment-info.json` with your contract address. The React app automatically loads this!

---

### **Option 3: Deploy to Polygon Amoy** (Faster & Cheaper)

Polygon is an Ethereum sidechain with faster transactions:

**Step 1: Add Polygon Amoy to MetaMask**

1. Visit: https://chainlist.org/
2. Search "Polygon Amoy"
3. Click "Add to MetaMask"

**Step 2: Get Test MATIC**

- Faucet: https://faucet.polygon.technology/

**Step 3: Update `.env`**

```
PRIVATE_KEY=your_private_key_here
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
```

**Step 4: Deploy**

```bash
npx hardhat run scripts/deploy.js --network amoy
```

---

## 🎮 Using the Blockchain Verifier

### Step 1: Connect MetaMask

1. Open your app: `http://localhost:5173`
2. Click "Blockchain Verifier"
3. Click "Connect MetaMask"
4. Approve the connection

### Step 2: Generate & Submit Proof

1. Enter a secret number (e.g., `42`)
2. Click "Generate & Submit to Blockchain"
3. Wait for proof generation (~2-3 seconds)
4. **Approve the transaction** in MetaMask popup
5. Wait for confirmation (~15-30 seconds on Sepolia)
6. ✅ Proof verified and stored on blockchain!

### Step 3: View on Block Explorer

Click the "View on Etherscan" link to see your transaction on the blockchain!

---

## 💰 Cost Breakdown

### Sepolia Testnet (FREE!)

- **Deployment:** ~0.01 test ETH (FREE from faucet)
- **Per Proof:** ~0.001 test ETH (FREE)
- **Total Cost:** $0.00 (it's a test network!)

### Polygon Amoy (FREE!)

- **Deployment:** ~0.01 test MATIC (FREE from faucet)
- **Per Proof:** ~0.0001 test MATIC (FREE)
- **Total Cost:** $0.00 (test network!)

### Ethereum Mainnet (Real Money)

- **Deployment:** ~0.01 ETH (~$30-50 depending on gas)
- **Per Proof:** ~0.001 ETH (~$3-5 per proof)
- **⚠️ Not recommended** for testing!

### Polygon Mainnet (Production)

- **Deployment:** ~0.01 MATIC (~$0.01)
- **Per Proof:** ~0.0001 MATIC (~$0.0001)
- **Best for production** - same security, way cheaper!

---

## 🔍 What Gets Stored On-Chain?

```solidity
struct ProofData {
    address prover;        // Your wallet address
    uint256 publicHash;    // The hash of your secret
    uint256 timestamp;     // When proof was verified
    bool isValid;          // Always true if stored
}
```

**What's PUBLIC:**

- ✅ Your wallet address
- ✅ The hash output
- ✅ Timestamp
- ✅ That proof is valid

**What's PRIVATE:**

- 🔒 Your secret number (NEVER revealed!)
- 🔒 The proof itself (cryptographic values)

---

## 🛠️ Advanced: Verify Existing Contract

If the contract is already deployed, you can just use it:

1. Get the contract address
2. Create `deployment-info.json`:

```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0xYourContractAddress",
  "deployer": "0xYourAddress",
  "timestamp": "2025-10-14T12:00:00.000Z"
}
```

3. Place it in the `zk-proof` directory
4. Refresh the app

---

## 🐛 Troubleshooting

### "MetaMask Not Installed"

→ Install MetaMask browser extension

### "Insufficient funds"

→ Get free test ETH from faucet (see above)

### "Wrong network"

→ Switch to Sepolia in MetaMask

### "Contract not deployed"

→ Run deployment script first

### "Transaction failed"

→ Increase gas limit or check if you have enough test ETH

### "Nonce too low"

→ Reset MetaMask: Settings → Advanced → Reset Account

---

## 📚 Understanding the Smart Contract

### `ZKProofVerifier.sol`

Our contract has two parts:

**1. Groth16Verifier (Auto-generated)**

- Contains the cryptographic verification logic
- Generated from your circuit
- Verifies the math is correct

**2. ZKProofVerifier (Our wrapper)**

- User-friendly functions
- Stores verified proofs
- Emits events
- Provides query functions

### Key Functions:

```solidity
// Verify and store a proof
function verifyAndStore(
    uint[2] memory pA,
    uint[2][2] memory pB,
    uint[2] memory pC,
    uint[1] memory pubSignals
) public returns (bool)

// Get total proofs
function getTotalProofs() public view returns (uint256)

// Get your proofs
function getProofsByProver(address prover)
    public view returns (bytes32[] memory)
```

---

## 🔐 Security Best Practices

1. **NEVER share your private key**
2. **NEVER commit `.env` to git** (already in `.gitignore`)
3. **Use testnets first** before mainnet
4. **Verify contracts** on Etherscan after deployment
5. **Test thoroughly** on testnet before production
6. **Keep MetaMask secure** - use a strong password

---

## 🌟 Real-World Applications

Once deployed, your contract can be used for:

1. **Decentralized Authentication**

   - Prove you know password without revealing it
   - No central server needed

2. **Privacy-Preserving KYC**

   - Prove you're over 18 without revealing age
   - Prove you're from a country without revealing passport

3. **Anonymous Voting**

   - Prove you're eligible to vote
   - Keep your vote private

4. **Private Transactions**

   - Like Zcash or Tornado Cash
   - Prove transaction validity without revealing amount

5. **Credential Verification**
   - Prove you have a degree
   - Without showing the degree itself

---

## 📊 Contract Interaction Examples

### From JavaScript (React App):

```javascript
// Connect to contract
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(address, ABI, signer);

// Submit proof
const tx = await contract.verifyAndStore(pA, pB, pC, pubSignals);
await tx.wait();

// Query total proofs
const total = await contract.getTotalProofs();
```

### From Hardhat Console:

```bash
npx hardhat console --network sepolia

> const Contract = await ethers.getContractFactory("ZKProofVerifier");
> const contract = await Contract.attach("0xYourAddress");
> const total = await contract.getTotalProofs();
> console.log(total);
```

---

## 🎯 Next Steps

1. ✅ Deploy to Sepolia testnet
2. ✅ Test proof submission
3. ✅ View transaction on Etherscan
4. ✅ Query your proofs from the contract
5. 🚀 Deploy to Polygon mainnet (production)
6. 🌍 Share your contract with the world!

---

## 📞 Quick Reference

| Task              | Command                                                       |
| ----------------- | ------------------------------------------------------------- |
| Local blockchain  | `npx hardhat node`                                            |
| Deploy local      | `npx hardhat run scripts/deploy-local.js --network localhost` |
| Deploy Sepolia    | `npx hardhat run scripts/deploy.js --network sepolia`         |
| Deploy Polygon    | `npx hardhat run scripts/deploy.js --network amoy`            |
| Hardhat console   | `npx hardhat console --network sepolia`                       |
| Compile contracts | `npx hardhat compile`                                         |
| Run tests         | `npx hardhat test`                                            |

---

## 🎉 Congratulations!

You now have a fully functional ZK-SNARK proof verification system on the Ethereum blockchain!

Your proofs are:

- ✅ Cryptographically secure
- ✅ Publicly verifiable
- ✅ Permanently stored
- ✅ Privacy-preserving
- ✅ Decentralized

**Welcome to the world of Web3 privacy! 🔐⛓️**

---

**Need Help?** Check the main README.md or create an issue on GitHub!
