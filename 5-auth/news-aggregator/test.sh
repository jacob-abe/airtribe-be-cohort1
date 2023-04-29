#!/bin/bash

# Define variables
API_URL="http://localhost:3000"
USERNAME="user"
PASSWORD="password"
ACCESS_TOKEN=""

# Register user
curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" $API_URL/register

# Log in and retrieve access token
ACCESS_TOKEN=$(curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" $API_URL/login | jq -r ".accessToken")

# Use access token to hit the /news endpoint
curl -H "Authorization: Bearer $ACCESS_TOKEN" $API_URL/news
