# ZK-SNARK React App Setup Guide

This React application implements a Zero-Knowledge Proof system using ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) following the Groth16 protocol.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Circom Compiler** - Install it using:

```bash
# Install Rust first if you don't have it
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

# Clone and install circom
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom
```

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

This script will:

- Compile the circuit using Circom
- Download the powers of tau file (trusted setup)
- Generate proving and verification keys
- Move necessary files to the public directory

### Step 3: Run the Application

```bash
npm run dev
```

## How It Works

### The Circuit

The application uses a Circom circuit that:

- Takes a secret number as input
- Hashes it using the Pedersen hash function
- Outputs the hash

### Proof Generation

When you enter a secret number:

1. The prover generates a proof that they know a secret that hashes to a specific value
2. The proof doesn't reveal the secret itself

### Proof Verification

The verifier can:

1. Check the proof using the verification key
2. Confirm that the prover knows the secret without learning what it is

## What is Zero-Knowledge Proof?

A zero-knowledge proof allows one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information beyond the validity of the statement itself.

In this app, you prove you know a secret number that produces a specific hash, without revealing the secret number.

## Files Structure

- `circuit.circom` - The circuit definition
- `setup.sh` - Setup automation script
- `public/zkp/` - Contains compiled circuit and keys
  - `circuit.wasm` - Compiled circuit
  - `circuit_0000.zkey` - Proving key
  - `verification_key.json` - Verification key

## Troubleshooting

**Circuit compilation fails:**

- Ensure circom is properly installed: `circom --version`
- Check that circomlib is installed: `npm list circomlib`

**Key generation fails:**

- Make sure the powers of tau file was downloaded completely
- Check that snarkjs is installed: `npm list snarkjs`

**React app can't find files:**

- Ensure the setup script completed successfully
- Check that files exist in `public/zkp/` directory

## Learn More

- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS Documentation](https://github.com/iden3/snarkjs)
- [ZK-SNARK Tutorial](https://dev.to/yagnadeepxo/the-beginners-guide-to-zk-snark-setting-up-your-first-proof-system-3le3)
