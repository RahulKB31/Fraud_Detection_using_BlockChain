#!/bin/bash

# Enable script safety features
set -euo pipefail

# Configuration
PARACHAIN_DIR="../node"
BIN_NAME="node-template"
BUILD_MODE="release"
DEV_FLAGS="--dev"

# Navigate to parachain directory
echo "📁 Moving to parachain node directory: $PARACHAIN_DIR"
if ! cd "$PARACHAIN_DIR"; then
    echo "❌ Failed to change directory to $PARACHAIN_DIR" >&2
    exit 1
fi

# Clean previous build artifacts (optional)
# echo "🧹 Cleaning previous build..."
# cargo clean

# Build the parachain node
echo "🔨 Building $BIN_NAME in $BUILD_MODE mode..."
if ! cargo build --"$BUILD_MODE"; then
    echo "❌ Build failed!" >&2
    exit 1
fi

# Verify binary exists
BIN_PATH="./target/$BUILD_MODE/$BIN_NAME"
if [[ ! -f "$BIN_PATH" ]]; then
    echo "❌ Built binary not found at $BIN_PATH" >&2
    exit 1
fi

# Start the parachain node
echo "🚀 Starting $BIN_NAME in development mode..."
echo "⏳ Press Ctrl+C to stop the node"
sleep 1  # Give user time to read message

exec "$BIN_PATH" $DEV_FLAGS
