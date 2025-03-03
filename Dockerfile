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
CMD sh -c "nohup tailscaled --tun=userspace-networking --socks5-server=localhost:1055 & sleep 5 && sudo tailscale up --auth-key=tskey-auth-kLdC3nCpfy11CNTRL-LEycaSUsMAa7hXrPZp4ABam7zF85hFsp8 --accept-routes=true && pnpm run start"
