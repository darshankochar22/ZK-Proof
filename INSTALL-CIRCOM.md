# How to Install Circom Compiler

The Circom compiler is required to compile the circuit and generate the necessary files for the ZK-SNARK proof system.

## Prerequisites

You need to have **Rust** installed on your system. If you don't have it, install it first:

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
```

## Installation Steps

### Option 1: Install from Source (Recommended)

```bash
# Clone the Circom repository
git clone https://github.com/iden3/circom.git

# Navigate to the circom directory
cd circom

# Build the release version
cargo build --release

# Install circom globally
cargo install --path circom

# Verify installation
circom --version
```

### Option 2: Using Cargo directly

```bash
# Install circom directly using cargo
cargo install circom

# Verify installation
circom --version
```

## Expected Output

After successful installation, running `circom --version` should output something like:

```
circom compiler 2.1.6
```

## Troubleshooting

### Issue: Command not found after installation

If `circom` is not found after installation, you may need to add Cargo's bin directory to your PATH:

```bash
# Add to your ~/.zshrc or ~/.bashrc
export PATH="$HOME/.cargo/bin:$PATH"

# Reload your shell configuration
source ~/.zshrc  # or source ~/.bashrc
```

### Issue: Build fails

Make sure you have the latest version of Rust:

```bash
rustup update
```

### Issue: Permission denied

Try using `sudo` for the cargo install command:

```bash
sudo cargo install --path circom
```

## Next Steps

After installing Circom, return to the main project directory and run:

```bash
./setup.sh
```

This will:

1. Compile the circuit
2. Download the powers of tau file
3. Generate proving and verification keys
4. Prepare all files for the React app

## Alternative: Using Pre-compiled Binaries

If you're having trouble building from source, you can download pre-compiled binaries from the Circom releases page:

https://github.com/iden3/circom/releases

Download the appropriate binary for your system and place it in your PATH.

## For macOS Users

You can also use Homebrew (if a formula becomes available):

```bash
# Check if available
brew search circom

# If available
brew install circom
```

## Verification

To verify everything is working correctly:

```bash
# Create a test circuit
echo 'pragma circom 2.0.0; template Test() { signal input a; signal output b; b <== a; } component main = Test();' > test.circom

# Compile it
circom test.circom --r1cs --wasm --sym

# Clean up
rm test.circom circuit.r1cs circuit.wasm circuit.sym
```

If this works without errors, you're all set!
