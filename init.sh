#!/bin/bash

echo "🚀 Initiating local development setup..."

# Install local dependencies if node/npm is available (for local IDE support like TypeScript)
if command -v npm &> /dev/null; then
    echo "📦 Installing local npm dependencies..."
    npm install
else
    echo "⚠️ npm not found. Skipping local dependency installation."
    echo "Note: You need Node.js and npm installed locally if you want IDE intellisense."
fi

# Docker Configuration
IMAGE_NAME="tectical-test-app"
CONTAINER_NAME="tectical-test-app-container"
PORT="8080"

echo ""
echo "🐳 Preparing Docker runtime..."

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in the PATH."
    echo "Please install Docker to run the application in a container."
    exit 1
fi

echo "🔄 Cleaning up any existing containers..."
# 1. Stop and remove our specific container if it exists
docker rm -f ${CONTAINER_NAME} > /dev/null 2>&1 || true

# 2. Stop any other container that might be blocking our port
CONFLICTING_CONTAINER=$(docker ps -q -f publish=${PORT})
if [ -n "$CONFLICTING_CONTAINER" ]; then
    echo "⚠️  Found other containers using port ${PORT}. Stopping them..."
    docker rm -f $CONFLICTING_CONTAINER > /dev/null 2>&1 || true
fi


# Build the Docker image
echo "🔨 Building Docker image '${IMAGE_NAME}'..."
if docker build -t ${IMAGE_NAME} .; then
    # Run the Docker container
    echo "🚀 Starting Docker container '${CONTAINER_NAME}' on port ${PORT}..."
    docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 ${IMAGE_NAME}
    
    echo ""
    echo "✅ Success! Project initiated."
    echo "🌐 Application is running and accessible at: http://localhost:${PORT}"
else
    echo "❌ Docker image build failed. Please check the logs above for errors."
    exit 1
fi
