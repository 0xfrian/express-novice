#!/bin/bash

curl http://localhost:3000/upload-data \
  --silent \
  -X POST \
  -F "data=@./public/dungeon.png" \
  -F "json={\"foo\":\"bar\",\"name\":\"frian\"};type=application/json" \
  | jq .

echo
