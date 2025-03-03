# Use a lightweight base image
FROM debian:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y curl sudo nodejs npm && rm -rf /var/lib/apt/lists/*

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

# Start Tailscale and then the Node.js app
CMD sh -c "sudo tailscale up --auth-key=tskey-auth-kLdC3nCpfy11CNTRL-LEycaSUsMAa7hXrPZp4ABam7zF85hFsp8 && pnpm run start"
