# Use a lightweight base image
FROM debian:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y curl sudo nodejs npm iproute2 && rm -rf /var/lib/apt/lists/*

# Install PNPM globally
RUN npm install -g pnpm

# Set up Node.js application
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Expose Railway's required port (8080)
EXPOSE 8080

# Install Tailscale
RUN curl -fsSL https://tailscale.com/install.sh | sh

# Ensure Tailscale daemon starts properly and runs the app
CMD sh -c "nohup tailscaled --tun=userspace-networking --socks5-server=localhost:1055 & sleep 5 && sudo tailscale up --auth-key=${TS_AUTHKEY} --accept-routes=true --exit-node=none --shields-up=false --force-reauth && pnpm run start"
