#!/bin/bash
docker run -d \
    -p 27017:27017 \
    --name alaya-fullstack-challenge-db \
    -v alaya-db-data:/data/db \
    mongo:latest