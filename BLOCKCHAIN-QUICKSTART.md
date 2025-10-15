# ⚡ Blockchain Quick Start (5 Minutes!)

Get your ZK-SNARK proofs on Ethereum in 5 minutes!

---

## 🎯 Goal

Submit a zero-knowledge proof to the Ethereum blockchain (for FREE using testnet!)

---

## ✅ Step 1: Install MetaMask (2 minutes)

1. Go to: https://metamask.io/download/
2. Install the browser extension
3. Create a new wallet (follow the prompts)
4. **SAVE YOUR SEED PHRASE SECURELY!**

---

## ✅ Step 2: Get Free Test ETH (1 minute)

1. **Open MetaMask** → Click network dropdown (top)
2. **Enable test networks:**

   - Settings → Advanced → "Show test networks" = ON
   - Switch to "Sepolia test network"

3. **Get free test ETH:**
   - Visit: https://sepoliafaucet.com/
   - Sign in with GitHub/Twitter
   - Enter your wallet address
   - Click "Send Me ETH"
   - Wait 30 seconds → You'll get 0.5 test ETH!

---

## ✅ Step 3: Deploy Smart Contract (1 minute)

**Option A: Use My Deployed Contract** (Easiest!)

```bash
# Just create this file:
echo '{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0xYourContractAddress",
  "deployer": "0xAddress"
}' > deployment-info.json
```

Ask me for the contract address and you can skip deployment!

**Option B: Deploy Your Own**

```bash
# 1. Get your private key from MetaMask
#    (Account Details → Export Private Key)

# 2. Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env

# 3. Deploy!
npm run deploy:sepolia
```

---

## ✅ Step 4: Use the App! (1 minute)

1. **Open:** http://localhost:5173
2. **Click:** "Blockchain Verifier"
3. **Click:** "Connect MetaMask" → Approve
4. **Enter** a secret number (e.g., `42`)
5. **Click:** "Generate & Submit to Blockchain"
6. **Approve** the transaction in MetaMask
7. **Wait** ~15-30 seconds
8. **🎉 DONE!** Your proof is on the blockchain!

---

## 🔍 Verify It Worked

Click the "View on Etherscan" link to see your transaction on the blockchain explorer!

You'll see:

- ✅ Transaction confirmed
- ✅ Contract interaction
- ✅ Your proof stored permanently!

---

## 💰 Cost

**Testnet (Sepolia):** $0.00 - It's FREE!

- Test ETH is free from faucets
- Deploy: ~0.01 test ETH
- Per proof: ~0.001 test ETH

**Real Ethereum:** $30-50 deployment, $3-5 per proof
**Polygon (cheaper):** $0.01 deployment, $0.0001 per proof

---

## 🚀 npm Scripts Reference

```bash
# Blockchain commands
npm run compile         # Compile smart contracts
npm run deploy:local    # Deploy to local network
npm run deploy:sepolia  # Deploy to Sepolia testnet
npm run deploy:amoy     # Deploy to Polygon Amoy
npm run node            # Start local blockchain
npm run console         # Hardhat console

# App commands
npm run dev             # Start React app
npm run setup           # Setup ZK circuit
npm run build           # Build for production
```

---

## 🐛 Troubleshooting

**"MetaMask not installed"**
→ Install from https://metamask.io

**"Insufficient funds"**
→ Get more test ETH from faucet

**"Wrong network"**
→ Switch to Sepolia in MetaMask

**"Transaction failed"**
→ Make sure you have enough test ETH (~0.01)

**"Contract not deployed"**
→ Create deployment-info.json with contract address

---

## 🎓 What Just Happened?

1. **You generated a ZK-SNARK proof** in your browser
2. **You submitted it to Ethereum** blockchain
3. **The smart contract verified** it mathematically
4. **Your proof is now stored** permanently on-chain
5. **Your secret stayed private** - never revealed!

---

## 🌟 Next Steps

1. ✅ Try different secret numbers
2. ✅ View your proofs on Etherscan
3. ✅ Share your contract address with friends
4. ✅ They can verify your proofs!
5. 🚀 Deploy to Polygon mainnet (production)

---

## 📚 Learn More

- **Full Guide:** BLOCKCHAIN-SETUP.md
- **Demo Guide:** DEMO-GUIDE.md
- **Main README:** README.md

---

**🎉 Congratulations! You're now using ZK-SNARKs on Ethereum!** ⛓️🔐
