# Use Node.js Alpine base image
FROM node:18-alpine

# Install required dependencies
RUN apk add --no-cache iptables openrc curl && \
    curl -fsSL https://pkgs.tailscale.com/stable/alpine/repo.aarch64/apk.key -o /etc/apk/keys/tailscale.pub && \
    echo "https://pkgs.tailscale.com/stable/alpine/repo.aarch64" >> /etc/apk/repositories && \
    apk add --no-cache tailscale

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Expose Railway's required port (8080)
EXPOSE 8080

# Start Tailscale and the Node.js app
CMD sh -c "tailscaled & sleep 3 && tailscale up --authkey=${TS_AUTHKEY} --accept-routes && pnpm run start"
