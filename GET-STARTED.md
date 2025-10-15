# 🎯 GET STARTED IN 3 COMMANDS

## The Fastest Way to Start

```bash
# 1. Install Circom (automated)
./install-circom.sh

# 2. Setup the circuit and keys
./setup.sh

# 3. Run the app
npm run dev
```

That's it! Open your browser and start proving! 🎉

---

## 📋 What Each Command Does

### Command 1: `./install-circom.sh`

- Checks if Rust is installed (installs if needed)
- Installs the Circom compiler via Cargo
- Verifies the installation

**Time:** 5-10 minutes (first time only)

### Command 2: `./setup.sh`

- Compiles the circuit to WebAssembly
- Downloads the powers of tau file (4.6 MB)
- Generates proving and verification keys
- Copies files to the public directory

**Time:** 1-2 minutes

### Command 3: `npm run dev`

- Starts the Vite development server
- Opens your browser automatically

**Time:** 5 seconds

---

## 🎮 Using the App

### Step 1: Enter a Secret

Type any number in the input field (e.g., `12345`)

### Step 2: Generate Proof

Click the "🔑 Generate Proof" button

- Watch as the app creates a cryptographic proof
- See the public hash output
- View the complete proof data

### Step 3: Verify Proof

Click the "✅ Verify Proof" button

- The verifier checks your proof
- Get instant confirmation
- Your secret remains hidden! 🔐

---

## 🔥 Quick Demo Flow

```
1. Enter secret: 12345
   ↓
2. Click "Generate Proof"
   ↓
3. See: Public hash + Proof generated
   ↓
4. Click "Verify Proof"
   ↓
5. Result: ✅ Verification Successful!
   (without revealing 12345)
```

---

## 🐛 Troubleshooting

### "Command not found: ./install-circom.sh"

```bash
chmod +x install-circom.sh
./install-circom.sh
```

### "Circom already installed"

Skip to command 2:

```bash
./setup.sh
```

### "Setup fails"

Check that Circom is installed:

```bash
circom --version
```

If not installed, run:

```bash
./install-circom.sh
```

### "App shows 'Setup Required' warning"

You need to run the setup script:

```bash
./setup.sh
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete project overview
- **[QUICK-START.md](./QUICK-START.md)** - 5-step quick start
- **[INSTALL-CIRCOM.md](./INSTALL-CIRCOM.md)** - Manual Circom installation
- **[README-SETUP.md](./README-SETUP.md)** - Detailed setup guide

---

## 🎓 What You're Learning

By running this app, you'll understand:

- ✅ Zero-Knowledge Proofs
- ✅ ZK-SNARKs and Groth16 protocol
- ✅ Circom circuits
- ✅ Pedersen hash functions
- ✅ Proof generation and verification

---

## 🚀 Next Steps After Running

1. **Experiment** - Try different secret numbers
2. **Explore** - Read the circuit code in `circuit.circom`
3. **Modify** - Change the circuit and see what happens
4. **Learn** - Read the linked documentation
5. **Build** - Create your own ZK proof system!

---

## 💡 Pro Tips

- The setup only needs to be run once
- Your secrets are processed entirely in your browser
- All cryptographic operations happen client-side
- The app works offline after initial setup

---

## 🌟 Having Fun?

- Star this project ⭐
- Share with friends 🤝
- Build something cool 🚀
- Learn more about ZK proofs 🧠

---

**Happy Proving! 🎉🔐**

_Remember: You're now a zero-knowledge cryptographer!_
