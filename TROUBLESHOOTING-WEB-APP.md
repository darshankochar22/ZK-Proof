# 🔧 Web App Troubleshooting Guide

## ✅ Fixes Applied

I've fixed the following issues in the BlockchainVerifier component:

### **1. Chain ID Comparison Bug**
- **Problem:** Chain ID comparison was failing (number vs string)
- **Fix:** Added `.toString()` to both sides of comparison
- **Location:** `src/pages/BlockchainVerifier.jsx` line 80

### **2. Missing Loading State**
- **Problem:** No feedback when contract address is loading
- **Fix:** Added "Loading Contract..." UI when wallet connected but contract not loaded
- **Location:** Lines 271-288

### **3. Better Error Messages**
- **Problem:** Silent failures, hard to debug
- **Fix:** Added console.log statements and detailed error messages
- **Location:** Throughout `connectWallet` and `loadContractAddress` functions

---

## 🚀 How to Use the Web App Now

### **Step 1: Start the Dev Server**

```bash
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
npm run dev
```

The app should open at: **http://localhost:5173**

### **Step 2: Navigate to Blockchain Verifier**

- Click the **"⛓️ Blockchain Verifier"** button
- Or go directly to: **http://localhost:5173/blockchain**

### **Step 3: Connect MetaMask**

1. **Make sure MetaMask is installed**
   - If not, install from: https://metamask.io/download/

2. **Switch to Sepolia Network**
   - Open MetaMask
   - Click network dropdown (top left)
   - Select **"Sepolia test network"**
   - If not visible: Settings → Advanced → Enable "Show test networks"

3. **Click "🦊 Connect MetaMask"**
   - Approve the connection in MetaMask popup
   - Wait for wallet info to load

### **Step 4: Verify Contract Loaded**

After connecting, you should see:

```
Connected Account: 0x5C54...7903
Chain ID: 11155111
Balance: 0.XXXX ETH
Contract: 0x9DDA...2e95  ← This should appear!
Total Proofs: 1
```

**If you DON'T see the Contract address:**
- Open browser console (F12)
- Look for error messages
- See troubleshooting section below

### **Step 5: Generate & Submit Proof**

Once contract is loaded, you'll see the proof generation section:

1. **Enter a secret number** (e.g., `12345`)
2. Click **"🚀 Generate & Submit to Blockchain"**
3. **Wait for proof generation** (~5 seconds)
   - You'll see "⏳ Processing..."
4. **Approve transaction in MetaMask**
   - MetaMask popup will appear
   - Click "Confirm"
5. **Wait for confirmation** (~15-30 seconds)
6. **Success!** You'll see:
   - ✅ Proof verified and stored on blockchain!
   - Transaction hash
   - Link to Etherscan

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Contract not deployed on this network"**

**Symptoms:**
- Wallet connects successfully
- Error message appears
- No proof generation section

**Causes:**
- Wrong network selected in MetaMask
- Chain ID mismatch

**Solution:**
```bash
1. Open MetaMask
2. Switch to "Sepolia test network"
3. Refresh the page
4. Reconnect wallet
```

**Expected Chain ID:** `11155111` (Sepolia)

---

### **Issue 2: "No deployment info found"**

**Symptoms:**
- Wallet connects
- No contract address shown
- Error in console

**Causes:**
- `deployment-info.json` not in public folder
- Dev server not serving the file

**Solution:**
```bash
# Copy deployment info to public folder
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
cp deployment-info.json public/

# Restart dev server
npm run dev
```

**Verify it's accessible:**
```bash
curl http://localhost:5173/deployment-info.json
```

Should return:
```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95",
  ...
}
```

---

### **Issue 3: "MetaMask not detected"**

**Symptoms:**
- Red error message
- "Install MetaMask" button

**Solution:**
```bash
1. Install MetaMask extension: https://metamask.io/download/
2. Restart browser
3. Refresh the page
```

---

### **Issue 4: "Insufficient funds for gas"**

**Symptoms:**
- Proof generates successfully
- Transaction fails in MetaMask
- Error: "insufficient funds"

**Solution:**
```bash
Get test ETH from a faucet (free):
1. Visit: https://sepoliafaucet.com/
2. Enter your wallet address
3. Click "Send Me ETH"
4. Wait 1-2 minutes
5. Check MetaMask balance
6. Try again
```

**Alternative faucets:**
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://sepolia-faucet.pk910.de/

---

### **Issue 5: Proof generation stuck at "Processing..."**

**Symptoms:**
- Button shows "⏳ Processing..."
- Never completes
- No MetaMask popup

**Causes:**
- Circuit files not loaded
- JavaScript error

**Solution:**
```bash
1. Open browser console (F12)
2. Look for errors
3. Check if these files exist:
   - /zkp/circuit.wasm
   - /zkp/circuit_0000.zkey
   - /zkp/verification_key.json

4. Verify files are in public/zkp/ folder:
   ls -la public/zkp/
```

**If files are missing:**
```bash
# Copy circuit files to public folder
mkdir -p public/zkp
cp circuit_js/circuit.wasm public/zkp/
cp circuit_0000.zkey public/zkp/
cp verification_key.json public/zkp/

# Restart dev server
npm run dev
```

---

### **Issue 6: Transaction fails after MetaMask approval**

**Symptoms:**
- MetaMask transaction submitted
- Transaction fails on blockchain
- Red error message

**Possible Causes:**
1. **Invalid proof** - Check your secret number
2. **Out of gas** - Increase gas limit in MetaMask
3. **Network congestion** - Wait and retry

**Solution:**
```bash
1. Check transaction on Etherscan:
   https://sepolia.etherscan.io/tx/YOUR_TX_HASH

2. Look for error message

3. Common fixes:
   - Try a different secret number
   - Increase gas limit in MetaMask (Advanced options)
   - Wait 1 minute and retry
```

---

## 🔍 Debugging Steps

### **1. Check Browser Console**

```bash
1. Open browser (Chrome/Firefox)
2. Press F12 (or Cmd+Option+I on Mac)
3. Click "Console" tab
4. Look for red error messages
```

**What to look for:**
- `Failed to fetch deployment-info.json` → File not in public folder
- `Network error` → Wrong network selected
- `Contract call failed` → Contract issue
- `Proof generation failed` → Circuit files missing

### **2. Check MetaMask Network**

```bash
1. Open MetaMask
2. Check network name (top of popup)
3. Should say: "Sepolia test network"
4. Chain ID should be: 11155111
```

**If wrong network:**
```bash
1. Click network dropdown
2. Select "Sepolia test network"
3. Refresh page
4. Reconnect wallet
```

### **3. Check Contract on Etherscan**

```bash
Visit: https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95

Should show:
- Contract exists ✓
- Has bytecode ✓
- Has transactions ✓
```

### **4. Test Contract Manually**

```bash
# Using Hardhat console
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof
npx hardhat console --network sepolia
```

```javascript
// In console
const contract = await ethers.getContractAt(
  "ZKProofVerifier",
  "0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95"
);

// Should return a number
const total = await contract.getTotalProofs();
console.log("Total proofs:", total.toString());
```

If this works, the contract is fine. Issue is in the web app.

---

## 📋 Checklist Before Using Web App

- ✅ Dev server running (`npm run dev`)
- ✅ MetaMask installed
- ✅ On Sepolia network (Chain ID: 11155111)
- ✅ Have test ETH (at least 0.001 ETH)
- ✅ `deployment-info.json` in `public/` folder
- ✅ Circuit files in `public/zkp/` folder
- ✅ Browser console open (F12) for debugging

---

## 🎯 Expected Flow

```
1. Open http://localhost:5173/blockchain
   ↓
2. Click "🦊 Connect MetaMask"
   ↓
3. Approve connection in MetaMask
   ↓
4. See wallet info + contract address
   ↓
5. Enter secret number
   ↓
6. Click "🚀 Generate & Submit to Blockchain"
   ↓
7. Wait for proof generation (~5 sec)
   ↓
8. Approve transaction in MetaMask
   ↓
9. Wait for confirmation (~15-30 sec)
   ↓
10. ✅ Success! View on Etherscan
```

---

## 🆘 Still Having Issues?

### **Check these files exist:**

```bash
cd /Users/darshan/AndroidStudioProjects/SnapQuest/zk-proof

# Should all exist:
ls -la deployment-info.json
ls -la public/deployment-info.json
ls -la public/zkp/circuit.wasm
ls -la public/zkp/circuit_0000.zkey
ls -la public/zkp/verification_key.json
```

### **Verify dev server is running:**

```bash
# Should return JSON
curl http://localhost:5173/deployment-info.json

# Should return binary data
curl http://localhost:5173/zkp/circuit.wasm | head -c 100
```

### **Check MetaMask connection:**

```bash
# In browser console (F12)
console.log('MetaMask installed:', typeof window.ethereum !== 'undefined');
console.log('Connected accounts:', await window.ethereum.request({ method: 'eth_accounts' }));
console.log('Chain ID:', await window.ethereum.request({ method: 'eth_chainId' }));
```

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| **Contract Address** | `0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95` |
| **Network** | Sepolia Testnet |
| **Chain ID** | `11155111` |
| **Web App** | http://localhost:5173/blockchain |
| **Etherscan** | https://sepolia.etherscan.io/address/0x9DDA6AA5A9951575B59c6ACBb57E307Da5fe2e95 |

---

**The fixes are now in place. Try connecting your wallet again and check the browser console for detailed logs!** 🎯

