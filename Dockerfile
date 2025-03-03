# Use Node.js base image with Alpine
FROM node:18-alpine

# Install required dependencies
RUN apk add --no-cache iptables openrc && \
    wget -qO /etc/apk/keys/ts.key https://pkgs.tailscale.com/stable/alpine/ts.key && \
    echo "https://pkgs.tailscale.com/stable/alpine" >> /etc/apk/repositories && \
    apk add --no-cache tailscale

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Expose the port Railway expects (8080)
EXPOSE 8080

# Start Tailscale and the Node.js app
CMD sh -c "tailscaled & sleep 3 && tailscale up --authkey=${TS_AUTHKEY} --accept-routes && pnpm run start"
