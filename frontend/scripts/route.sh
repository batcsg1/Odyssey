#!/bin/sh

# This script sets up files for a new Svelte route.

# Run the script from the root directory of the frontend by using:
# scripts/route.sh <route-name>

# Navigate to the script's directory and then to the routes directory
cd "$(dirname "$0")" || exit 1
cd ../src/routes || exit 1

route=$1

# Create the route directory and necessary files
mkdir -p $route
touch $route/+page.svelte
touch $route/+page.server.js

