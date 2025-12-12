#!/bin/sh

# This script sets up files for a new Svelte route.

# Run the script from the root directory of the frontend by using:
# scripts/route.sh <route-name>


GREEN='\033[0;32m'
BLUE='\033[1;34m'

log_info() {
  echo -e "${GREEN}$1${NC}"
}

echo -e "${BLUE}=========================================="
echo -e "${BLUE}       Starting routes script...          "
echo -e "${BLUE}=========================================="

# Navigate to the script's directory and then to the routes directory
cd "$(dirname "$0")" || exit 1
cd ../src/routes || exit 1

for arg in "$@"; do
    log_info "Creating route: $arg"
    route=$arg

    # Create the route directory and necessary files
    mkdir -p $route
    touch $route/+page.svelte
    touch $route/+page.server.js
done


