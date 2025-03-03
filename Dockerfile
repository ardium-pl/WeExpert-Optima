# Use Node.js Alpine base image
FROM node:18-alpine

# Install necessary dependencies
RUN apk add --no-cache iptables openrc curl unzip

# Set working directory
WORKDIR /app

# Download and install Tailscale (latest static binary)
RUN curl -fsSL https://pkgs.tailscale.com/stable/tailscale.tgz -o /tmp/tailscale.tgz && \
    tar xzf /tmp/tailscale.tgz -C /usr/local/bin --strip-components=1 && \
    rm /tmp/tailscale.tgz

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Expose Railway's required port (8080)
EXPOSE 8080

# Start Tailscale and the Node.js app
CMD sh -c "/usr/local/bin/tailscaled & sleep 3 && /usr/local/bin/tailscale up --authkey=${TS_AUTHKEY} --accept-routes && pnpm run start"
