#!/bin/bash
# deploy.sh

echo "🚀 Starting WardFund NFT Contract Deployment..."

# Check if network parameter is provided
NETWORK=${1:-testnet}  # Default to testnet if no argument provided
SOURCE=${2:-bob}     # Default to bob if no source provided

echo "📝 Configuration:"
echo "Network: $NETWORK"
echo "Source: $SOURCE"

echo "🛠️  Building contract..."
cargo build --target wasm32-unknown-unknown --release

echo "📦 Installing contract to network..."
WASM_HASH=$(stellar contract upload \
    --network $NETWORK \
    --source $SOURCE \
    --wasm target/wasm32-unknown-unknown/release/$NETWORK/wardfund_nft.wasm)

echo "✨ Contract installed with hash: $WASM_HASH"

echo "🔧 Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
    --network $NETWORK \
    --source $SOURCE \
    --wasm-hash $WASM_HASH)

echo "🎉 Deployment successful!"
echo "Contract ID: $CONTRACT_ID"

# Save deployment info to a file
echo "Saving deployment information..."
cat > deployment-info.txt << EOF
Network: $NETWORK
WASM Hash: $WASM_HASH
Contract ID: $CONTRACT_ID
Deployment Date: $(date)
EOF

echo "✅ Deployment information saved to deployment-info.txt"