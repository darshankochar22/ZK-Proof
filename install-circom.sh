#!/bin/bash

echo "🚀 Circom Compiler Installation Script"
echo "======================================="
echo ""

# Check if circom is already installed
if command -v circom &> /dev/null
then
    echo "✅ Circom is already installed!"
    circom --version
    exit 0
fi

echo "📦 Installing Circom compiler..."
echo ""

# Check if Rust is installed
if ! command -v cargo &> /dev/null
then
    echo "⚠️  Rust is not installed. Installing Rust first..."
    echo ""
    
    # Install Rust
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
    
    # Source cargo environment
    source $HOME/.cargo/env
    
    echo "✅ Rust installed successfully!"
    echo ""
fi

# Update Rust to latest version
echo "🔄 Updating Rust..."
rustup update
echo ""

# Install Circom using Cargo
echo "📥 Installing Circom via Cargo..."
echo "   This may take a few minutes..."
echo ""

cargo install circom

# Check installation
if command -v circom &> /dev/null
then
    echo ""
    echo "🎉 Circom installed successfully!"
    echo ""
    circom --version
    echo ""
    echo "✅ You can now run: ./setup.sh"
else
    echo ""
    echo "❌ Installation failed. Please try manual installation:"
    echo "   See INSTALL-CIRCOM.md for detailed instructions"
    exit 1
fi

