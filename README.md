# 🔐 ZK-SNARK Proof System

A beautiful, interactive web application demonstrating **Zero-Knowledge Proofs** using ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) with the Groth16 protocol.

![ZK-SNARK Demo](https://img.shields.io/badge/ZK--SNARK-Groth16-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)
![Circom](https://img.shields.io/badge/Circom-2.0-green?style=for-the-badge)

## 🌟 What is This?

This application demonstrates the power of zero-knowledge cryptography. You can prove that you know a secret number that produces a specific hash **without revealing the secret itself**.

### Real-World Applications

- 🔐 **Privacy-preserving authentication** - Prove you know a password without revealing it
- 💰 **Anonymous transactions** - Used in cryptocurrencies like Zcash
- 🗳️ **Private voting** - Vote without revealing your choice
- 🎮 **Provably fair gaming** - Prove game fairness without exposing game state

## ⚡ Quick Start

**For impatient developers:** See [QUICK-START.md](./QUICK-START.md)

### Prerequisites

- Node.js v16+
- Circom compiler ([Installation Guide](./INSTALL-CIRCOM.md))

### Installation

```bash
# 1. Install npm dependencies
npm install

# 2. Install Circom (if you haven't already)
# See INSTALL-CIRCOM.md for detailed instructions

# 3. Run the setup script
chmod +x setup.sh
./setup.sh

# 4. Start the development server
npm run dev
```

That's it! Open your browser and start proving! 🎉

## 📖 How It Works

### The Three-Step Process

1. **🔨 Circuit Compilation**

   - A Circom circuit defines the computation (Pedersen hash)
   - The circuit is compiled to a constraint system (R1CS)
   - Keys are generated using a trusted setup (powers of tau)

2. **🔑 Proof Generation**

   - You enter a secret number
   - The prover generates a cryptographic proof
   - The proof shows you know the secret without revealing it

3. **✅ Proof Verification**
   - Anyone can verify the proof is valid
   - Verification confirms knowledge of the secret
   - The secret itself remains completely hidden

### The Mathematics

```
Secret Input → Pedersen Hash → Public Output
              ↓
         ZK-SNARK Proof
              ↓
    Verifier: ✅ or ❌
```

## 🎯 Features

- ✨ **Beautiful Modern UI** - Gradient design with smooth animations
- 🔐 **Zero-Knowledge Proofs** - Prove knowledge without revelation
- 🎨 **Interactive Demo** - Easy-to-use interface
- 📊 **Real-time Results** - See proofs and verification instantly
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Fast Performance** - Client-side proof generation
- 📚 **Educational** - Learn ZK-SNARKs by doing

## 🛠️ Technical Stack

- **Frontend**: React 19.1 with Vite
- **Circuit Language**: Circom 2.0
- **Proof System**: Groth16 (via SnarkJS)
- **Hash Function**: Pedersen hash
- **Styling**: Modern CSS with gradients and animations

## 📁 Project Structure

```
zk-proof/
├── src/
│   ├── App.jsx              # Main React component
│   ├── index.css            # All styling (beautiful gradients!)
│   └── main.jsx             # Entry point
├── public/
│   └── zkp/                 # Generated files (after setup)
│       ├── circuit.wasm     # Compiled circuit
│       ├── circuit_0000.zkey # Proving key
│       └── verification_key.json # Verification key
├── circuit.circom           # Circuit definition
├── setup.sh                 # Automated setup script
├── QUICK-START.md           # Quick start guide
├── INSTALL-CIRCOM.md        # Circom installation guide
└── README-SETUP.md          # Detailed setup documentation
```

## 🔬 The Circuit

The circuit (`circuit.circom`) is simple but powerful:

```circom
pragma circom 2.0.0;

include "node_modules/circomlib/circuits/pedersen.circom";

template Hasher(){
    signal input secret;
    signal output out;

    component pedersen = Pedersen(1);
    pedersen.in[0] <== secret;
    out <== pedersen.out[0];
}

component main = Hasher();
```

This circuit:

- Takes a secret number as input
- Computes a Pedersen hash
- Outputs the hash as a public signal

## 🚀 Usage

### Generating a Proof

1. Enter a secret number (e.g., `12345`)
2. Click "Generate Proof"
3. View the generated proof and public hash

### Verifying a Proof

1. After generating a proof, click "Verify Proof"
2. The system checks if the proof is valid
3. Get instant verification results

### Example Flow

```
You: "I know a number that hashes to X"
     (Enter 12345)
     ↓
App: Generates proof π
     ↓
Verifier: Checks proof π
     ↓
Result: ✅ Valid! (without learning 12345)
```

## 🎓 Learning Resources

### Documentation

- [Quick Start Guide](./QUICK-START.md) - Get running in 5 minutes
- [Circom Installation](./INSTALL-CIRCOM.md) - Install the circuit compiler
- [Setup Guide](./README-SETUP.md) - Detailed setup documentation

### External Resources

- [Original Tutorial](https://dev.to/yagnadeepxo/the-beginners-guide-to-zk-snark-setting-up-your-first-proof-system-3le3) - Step-by-step guide
- [Circom Documentation](https://docs.circom.io/) - Circuit language reference
- [SnarkJS](https://github.com/iden3/snarkjs) - Proof generation library
- [ZK-SNARK Explainer](https://z.cash/technology/zksnarks/) - Zcash's guide

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run setup (compile circuit, generate keys)
./setup.sh
```

### Modifying the Circuit

1. Edit `circuit.circom`
2. Run `./setup.sh` to recompile
3. Restart the dev server

### Example: Multi-Input Circuit

```circom
template MultiHasher(){
    signal input secret1;
    signal input secret2;
    signal output out;

    component pedersen = Pedersen(2);
    pedersen.in[0] <== secret1;
    pedersen.in[1] <== secret2;
    out <== pedersen.out[0];
}
```

## 🔒 Security Notes

- The powers of tau file is from a trusted setup ceremony
- This is a **demonstration** - use production-ready setups for real applications
- Never use the same proving key for different applications
- Keep your secrets safe - this app runs entirely client-side

## 🐛 Troubleshooting

### Common Issues

**"Circom not found"**

- Install Circom: See [INSTALL-CIRCOM.md](./INSTALL-CIRCOM.md)

**"Failed to generate proof"**

- Run `./setup.sh` to ensure all files are generated
- Check that `public/zkp/` contains the necessary files

**"Setup script fails"**

- Ensure Circom is installed: `circom --version`
- Check internet connection (for downloading powers of tau)
- Try running setup steps manually (see QUICK-START.md)

**"Verification fails"**

- Ensure the proof was generated successfully
- Try resetting and generating a new proof
- Check browser console for errors

## 🤝 Contributing

This is a learning project! Feel free to:

- Fork and experiment
- Add new circuits
- Improve the UI
- Add more hash functions
- Create tutorials

## 📜 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Tutorial by [yagnadeepxo](https://dev.to/yagnadeepxo)
- [Circom](https://github.com/iden3/circom) by iden3
- [SnarkJS](https://github.com/iden3/snarkjs) by iden3
- [Hermez/Polygon](https://hermez.io/) for powers of tau files

## 🌟 Star This Repo

If you find this helpful, give it a star! ⭐

---

**Built with ❤️ for the zero-knowledge community**

_Remember: With great cryptography comes great responsibility!_ 🦸‍♂️
