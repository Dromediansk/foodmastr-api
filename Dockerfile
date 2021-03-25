FROM node:15.12.0

# Create app directory
RUN mkdir -p /usr/src/xpense-api
WORKDIR /usr/src/xpense-api

# Creating build folder with index
RUN mkdir build
RUN touch build/index.js

# Install app dependencies
COPY package.json /usr/src/xpense-api
RUN npm install

# Bundle app source
COPY . /usr/src/xpense-api

# Build arguments
ARG NODE_VERSION=15.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION