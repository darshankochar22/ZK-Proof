#!/bin/bash

echo "🔧 Setting up ZK-SNARK circuit..."

# Check if circom is installed
if ! command -v circom &> /dev/null
then
    echo "❌ Circom compiler not found. Please install it first:"
    echo "   git clone https://github.com/iden3/circom.git"
    echo "   cd circom"
    echo "   cargo build --release"
    echo "   cargo install --path circom"
    exit 1
fi

# Compile the circuit
echo "📝 Compiling circuit..."
circom circuit.circom --r1cs --wasm --sym

if [ $? -ne 0 ]; then
    echo "❌ Circuit compilation failed"
    exit 1
fi

echo "✅ Circuit compiled successfully"

# Download powers of tau if not exists
if [ ! -f "powersOfTau28_hez_final_12.ptau" ]; then
    echo "⬇️  Downloading powers of tau file..."
    curl -L -o powersOfTau28_hez_final_12.ptau https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_12.ptau
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to download powers of tau file"
        exit 1
    fi
    echo "✅ Powers of tau downloaded"
else
    echo "✅ Powers of tau file already exists"
fi

# Generate proving and verification keys
echo "🔑 Generating proving and verification keys..."
npx snarkjs groth16 setup circuit.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey

if [ $? -ne 0 ]; then
    echo "❌ Key generation failed"
    exit 1
fi

echo "✅ Proving key generated"

# Export verification key
echo "🔑 Exporting verification key..."
npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json

if [ $? -ne 0 ]; then
    echo "❌ Verification key export failed"
    exit 1
fi

echo "✅ Verification key exported"

# Move files to public directory for React app access
echo "📦 Moving files to public directory..."
mkdir -p public/zkp
cp circuit_js/circuit.wasm public/zkp/
cp circuit_0000.zkey public/zkp/
cp verification_key.json public/zkp/

echo "🎉 Setup complete! You can now run the React app with 'npm run dev'"

