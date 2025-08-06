#!/bin/bash

# DevOps Portfolio - Test Runner Script
# This script runs all tests and generates reports for CI/CD integration

echo "🧪 Starting DevOps Portfolio Test Suite"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js to run tests."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm to run tests."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing test dependencies..."
    npm install

    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_status "Dependencies already installed"
fi

# Run different types of tests based on arguments
case "${1:-all}" in
    "unit")
        print_status "Running unit tests only..."
        npx jest tests/website.test.js --verbose
        ;;
    "integration")
        print_status "Running integration tests only..."
        npx jest tests/integration.test.js --verbose
        ;;
    "docker")
        print_status "Running Docker-specific tests only..."
        npx jest tests/docker.test.js --verbose
        ;;
    "coverage")
        print_status "Running all tests with coverage report..."
        npx jest --coverage
        ;;
    "ci")
        print_status "Running tests in CI mode..."
        npx jest --ci --coverage --watchAll=false --silent
        ;;
    "watch")
        print_status "Running tests in watch mode..."
        npx jest --watch
        ;;
    "all"|*)
        print_status "Running all tests..."
        npx jest --verbose
        ;;
esac

# Check test results
if [ $? -eq 0 ]; then
    print_success "All tests passed! ✅"
    echo ""
    echo "🚀 Your DevOps portfolio website is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "  • Build Docker image: docker build -t devops-portfolio:latest ."
    echo "  • Run container: docker run -d -p 8080:80 devops-portfolio:latest"
    echo "  • Set up CI/CD pipeline with these tests"
    echo ""
else
    print_error "Some tests failed! ❌"
    echo ""
    echo "🔧 Troubleshooting tips:"
    echo "  • Check the test output above for specific failures"
    echo "  • Ensure all HTML, CSS, and JS files are properly structured"
    echo "  • Verify Docker configuration if running container tests"
    echo ""
    exit 1
fi