# ZK-SNARK React App - Quick Start Guide

Welcome! This guide will help you get the ZK-SNARK proof system running in just a few steps.

## 📋 What You'll Need

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Circom Compiler** - See installation guide below

## 🚀 Quick Start (5 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Install Circom

**Don't have Circom yet?** Follow this quick guide:

```bash
# Install Rust (if you don't have it)
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Install Circom
cargo install circom

# Verify it works
circom --version
```

📖 **Need more help?** See [INSTALL-CIRCOM.md](./INSTALL-CIRCOM.md) for detailed instructions.

### Step 3: Run the Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

This script will automatically:

- ✅ Compile the circuit
- ✅ Download the powers of tau file (~4.6 MB)
- ✅ Generate proving and verification keys
- ✅ Move files to the public directory

**Expected time:** 1-2 minutes

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Navigate to the URL shown in your terminal (usually `http://localhost:5173`)

## 🎉 You're Done!

Try it out:

1. Enter a secret number (e.g., `12345`)
2. Click "Generate Proof"
3. Click "Verify Proof"
4. Watch the magic happen! ✨

## 🐛 Troubleshooting

### "Circom not found"

You need to install the Circom compiler. See [INSTALL-CIRCOM.md](./INSTALL-CIRCOM.md)

### "Failed to generate proof"

Make sure you ran `./setup.sh` successfully. Check that these files exist:

- `public/zkp/circuit.wasm`
- `public/zkp/circuit_0000.zkey`
- `public/zkp/verification_key.json`

### "Setup script fails"

Try running each step manually:

```bash
# Compile circuit
circom circuit.circom --r1cs --wasm --sym

# Download powers of tau
curl -L -o powersOfTau28_hez_final_12.ptau https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_12.ptau

# Generate keys
npx snarkjs groth16 setup circuit.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey

# Export verification key
npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json

# Create directory and copy files
mkdir -p public/zkp
cp circuit_js/circuit.wasm public/zkp/
cp circuit_0000.zkey public/zkp/
cp verification_key.json public/zkp/
```

## 📚 Learn More

- [Full Setup Guide](./README-SETUP.md) - Detailed documentation
- [Circom Installation](./INSTALL-CIRCOM.md) - Step-by-step Circom setup
- [Tutorial Source](https://dev.to/yagnadeepxo/the-beginners-guide-to-zk-snark-setting-up-your-first-proof-system-3le3) - Original tutorial

## 🤔 What is ZK-SNARK?

A **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** allows you to prove you know something (like a secret number) without revealing what it is.

**Real-world applications:**

- 🔐 Privacy-preserving authentication
- 💰 Anonymous cryptocurrency transactions (like Zcash)
- 🗳️ Private voting systems
- 🎮 Provably fair gaming

## 🎯 How This App Works

1. **Circuit**: A Circom circuit computes a Pedersen hash of your secret
2. **Proof**: The Groth16 protocol generates a zero-knowledge proof
3. **Verification**: Anyone can verify the proof without learning your secret

## 📁 Project Structure

```
zk-proof/
├── circuit.circom              # The circuit definition
├── setup.sh                    # Automated setup script
├── src/
│   ├── App.jsx                # Main React component
│   ├── index.css              # Styling
│   └── main.jsx               # Entry point
└── public/
    └── zkp/                   # Generated files (after setup)
        ├── circuit.wasm
        ├── circuit_0000.zkey
        └── verification_key.json
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `./setup.sh` - Run circuit compilation and setup

## 🌟 Next Steps

Once you have it working, try:

- Modifying the circuit to hash multiple inputs
- Adding different hash functions
- Creating your own zero-knowledge proof system!

## 💬 Need Help?

- Check the detailed guides in this directory
- Read the [original tutorial](https://dev.to/yagnadeepxo/the-beginners-guide-to-zk-snark-setting-up-your-first-proof-system-3le3)
- Search for Circom and SnarkJS documentation

Happy proving! 🎉
