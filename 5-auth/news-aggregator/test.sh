#!/bin/bash

# Define variables
API_URL="http://localhost:3000"
USERNAME="user"
PASSWORD="password"
ACCESS_TOKEN=""

# Register user
echo "Registering user..."
curl -sS -X POST -H "Content-Type: application/json" -d "{\"name\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" $API_URL/register

# Log in and retrieve access token
echo "Logging in and retrieving access token..."
ACCESS_TOKEN=$(curl -sS -X POST -H "Content-Type: application/json" -d "{\"name\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" $API_URL/login | jq -r ".accessToken")
echo "Access token: $ACCESS_TOKEN"

# Use access token to hit the /news endpoint
echo "Retrieving news for user..."
curl -sS -H "Authorization: Bearer $ACCESS_TOKEN" $API_URL/news | jq .

# Set user preferences
PREFERENCES="sports"
echo "Updating user preferences..."
curl -sS -X PUT -H "Authorization: Bearer $ACCESS_TOKEN" -H "Content-Type: application/json" -d "{\"preferences\":\"$PREFERENCES\"}" $API_URL/preferences

# Use access token to hit the /news endpoint
echo "Retrieving news for user with preferences..."
curl -sS -H "Authorization: Bearer $ACCESS_TOKEN" $API_URL/news?preferences=$PREFERENCES | jq .
