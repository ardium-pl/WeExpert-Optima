# Use Node.js Alpine base image
FROM node:18-alpine

# Install required dependencies
RUN apk add --no-cache iptables openrc curl

# Set working directory
WORKDIR /app

# Install Tailscale (official way for containers)
RUN curl -fsSL https://pkgs.tailscale.com/stable/tailscale-latest.tgz -o /tmp/tailscale.tgz && \
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

# Start Tailscale in the background, then start Node.js
CMD sh -c "/usr/local/bin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock --tun=userspace-networking & sleep 3 && /usr/local/bin/tailscale up --authkey=${TS_AUTHKEY} --accept-routes --hostname=railway-container && pnpm run start"
