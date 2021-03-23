FROM node:15.12.0

# Create app directory
RUN mkdir -p /usr/src/foodmastr-api
WORKDIR /usr/src/foodmastr-api

# Install app dependencies
COPY package.json /usr/src/foodmastr-api
RUN npm install

# Bundle app source
COPY . /usr/src/foodmastr-api

# Build arguments
ARG NODE_VERSION=15.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION