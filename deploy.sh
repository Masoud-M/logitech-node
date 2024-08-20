#!/bin/bash

cd logitech-node

git pull origin main

docker build -t logitech-node-app .

docker stop logitech-node-app-container || true
docker rm logitech-node-app-container || true

docker run -d --name logitech-node-app-container -p 8080:8080 logitech-node-app
