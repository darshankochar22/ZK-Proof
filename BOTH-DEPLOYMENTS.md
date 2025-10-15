# 🌐 Your Contracts on Multiple Networks

## 📊 You Have TWO Contracts Deployed!

### **Contract 1: Ethereum Sepolia** ⚡

```
📍 Address: 0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95
🌐 Network: Ethereum Sepolia
🆔 Chain ID: 11155111
🔍 Explorer: https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95
✅ Status: Active (1 proof stored)
```

### **Contract 2: zkSync Sepolia** 🚀

```
📍 Address: 0x633bdBA5d71a2591eD03deEe9E34EB356A035203
🌐 Network: zkSync Sepolia
🆔 Chain ID: 300
🔍 Explorer: https://sepolia.explorer.zksync.io/address/0x633bdBA5d71a2591eD03deEe9E34EB356A035203
✅ Status: Active (0 proofs stored)
```

---

## ⚠️ **IMPORTANT: Network Must Match Contract!**

You **cannot** use an Ethereum contract on zkSync, or vice versa!

| Your MetaMask Network | Use This Contract |
|----------------------|-------------------|
| **Ethereum Sepolia** (11155111) | `0x9DDA...2e95` |
| **zkSync Sepolia** (300) | `0x633b...5203` |

---

## 🎯 **Current Setup (zkSync)**

The web app is currently configured for **zkSync Sepolia**:

```json
{
  "network": "zkSyncSepolia",
  "chainId": 300,
  "contractAddress": "0x633bdBA5d71a2591eD03deEe9E34EB356A035203"
}
```

### **To Use It:**

1. **Make sure MetaMask is on zkSync Sepolia** (Chain ID: 300)
2. **Refresh browser:** http://localhost:5173/blockchain
3. **Connect wallet**
4. **Generate proof!**

---

## 🔄 **How to Switch Between Networks**

### **Option 1: Use zkSync (Current Setup)** 🚀

**Pros:** Faster, cheaper, already configured
**Cons:** Newer network, less familiar

```bash
# Already configured! Just use it:
1. MetaMask → Switch to "zkSync Sepolia Testnet"
2. Refresh web app
3. Connect wallet
4. Generate proof
```

### **Option 2: Switch Back to Ethereum Sepolia** ⚡

**Pros:** More familiar, already has 1 proof
**Cons:** Slower, more expensive gas

```bash
# Update deployment-info.json:
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof

# Create Ethereum deployment info
cat > deployment-info.json << 'EOF'
{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95",
  "deployer": "0x5C54f0012e7718c9f22823B0A7845372DDe17903",
  "timestamp": "2025-10-14T13:08:28.103Z"
}
EOF

# Copy to public folder
cp deployment-info.json public/

# Switch MetaMask to Ethereum Sepolia
# Refresh web app
```

---

## 📝 **Comparison**

| Feature | Ethereum Sepolia | zkSync Sepolia |
|---------|------------------|----------------|
| **Contract** | `0x9DDA...2e95` | `0x633b...5203` |
| **Chain ID** | 11155111 | 300 |
| **Proofs Stored** | 1 | 0 |
| **Transaction Speed** | ~15 seconds | ~5 seconds |
| **Gas Cost** | Higher | Lower (L2) |
| **Explorer** | Etherscan | zkSync Explorer |
| **Maturity** | Established | Newer |
| **CLI Verification** | ✅ Works | ❌ Has issues |
| **Web App** | ✅ Works | ✅ Works |

---

## 🎮 **Recommended: Use zkSync**

I recommend sticking with **zkSync Sepolia** because:

1. ✅ **Already configured** - deployment-info.json is set
2. ✅ **Faster** - 5 seconds vs 15 seconds
3. ✅ **Cheaper** - Lower gas fees (L2 scaling)
4. ✅ **Better UX** - Users prefer faster, cheaper transactions
5. ✅ **You're already on it** - MetaMask shows Chain ID: 300

---

## 🚀 **Quick Start (zkSync)**

```bash
# 1. Verify you're on zkSync Sepolia
# MetaMask should show: Chain ID 300

# 2. Refresh web app
http://localhost:5173/blockchain

# 3. Connect wallet
# Should show: Contract: 0x633b...5203

# 4. Generate proof
# Enter secret: 12345
# Click "Generate & Submit"
# Approve in MetaMask

# 5. View on zkSync Explorer
# https://sepolia.explorer.zksync.io/address/0x633bdBA5d71a2591eD03deEe9E34EB356A035203
```

---

## 🐛 **Why Did You Get the Error?**

The error happened because:

1. **MetaMask:** zkSync Sepolia (Chain ID: 300)
2. **deployment-info.json:** Ethereum contract (`0x9DDA...2e95`)
3. **Result:** Contract doesn't exist on zkSync! ❌

**Now fixed:** deployment-info.json points to zkSync contract (`0x633b...5203`) ✅

---

## 📋 **Files for Each Network**

### **For zkSync Sepolia (Current):**

`deployment-info.json`:
```json
{
  "network": "zkSyncSepolia",
  "chainId": 300,
  "contractAddress": "0x633bdBA5d71a2591eD03deEe9E34EB356A035203",
  "deployer": "0x5C54f0012e7718c9f22823B0A7845372DDe17903",
  "timestamp": "2025-10-14T13:38:47.000Z"
}
```

### **For Ethereum Sepolia (Backup):**

`deployment-info-ethereum.json`:
```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95",
  "deployer": "0x5C54f0012e7718c9f22823B0A7845372DDe17903",
  "timestamp": "2025-10-14T13:08:28.103Z"
}
```

---

## ✅ **Current Status**

- ✅ **zkSync contract deployed:** `0x633b...5203`
- ✅ **Ethereum contract deployed:** `0x9DDA...2e95`
- ✅ **Web app configured for:** zkSync Sepolia
- ✅ **deployment-info.json:** Points to zkSync contract
- ✅ **Ready to use!**

---

**Refresh your browser and try again! It should work now!** 🎯

