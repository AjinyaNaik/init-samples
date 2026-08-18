#!/usr/bin/env bash

# Colors for terminal styling
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

WEBHOOK_URL="http://localhost:3000/stripe/webhook"

echo -e "${PURPLE}=====================================================${NC}"
echo -e "${PURPLE}       🎶 Init-Samples Stripe Sandbox Helper         ${NC}"
echo -e "${PURPLE}=====================================================${NC}\n"

# 1. Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}❌ Stripe CLI is not installed.${NC}"
    echo -e "${YELLOW}Run: brew install stripe/stripe-cli/stripe${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Stripe CLI detected.${NC}"

# 2. Check if logged in
if ! stripe status &> /dev/null; then
    echo -e "${YELLOW}⚠️ You are not logged into Stripe CLI.${NC}"
    echo -e "${CYAN}Running stripe login...${NC}"
    stripe login
fi

echo -e "${GREEN}✓ Stripe CLI authenticated.${NC}\n"

# 3. Print Test Card Helper Banner
echo -e "${CYAN}-----------------------------------------------------${NC}"
echo -e "${YELLOW}💳 Stripe Sandbox Test Card Credentials:${NC}"
echo -e "   Card Number: ${GREEN}4242 4242 4242 4242${NC}"
echo -e "   Exp Date:    ${GREEN}12/30${NC}"
echo -e "   CVC:         ${GREEN}123${NC}"
echo -e "   ZIP Code:    ${GREEN}90210${NC}"
echo -e "${CYAN}-----------------------------------------------------${NC}\n"

echo -e "${CYAN}🚀 Forwarding webhooks to: ${GREEN}${WEBHOOK_URL}${NC}"
echo -e "${YELLOW}Press Ctrl+C anytime to stop the listener.${NC}\n"

# 4. Start Stripe Webhook Listener
stripe listen --forward-to "${WEBHOOK_URL}"
