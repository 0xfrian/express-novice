#!/bin/bash

curl -X POST \
  http://localhost:3000/post/json \
  -H "Content-Type: application/json" \
  -d '{
    "name": "foo", 
    "age": 24
  }'
