FROM alpine:3.18.3

# Setup tailscale
WORKDIR /tailscale.d

COPY start.sh /tailscale.d/start.sh

ENV TAILSCALE_VERSION "latest"
ENV TAILSCALE_HOSTNAME "railway-app"
ENV TAILSCALE_ADDITIONAL_ARGS ""

RUN wget https://pkgs.tailscale.com/stable/tailscale_${TAILSCALE_VERSION}_amd64.tgz && \
  tar xzf tailscale_${TAILSCALE_VERSION}_amd64.tgz --strip-components=1

RUN apk update && apk add ca-certificates iptables ip6tables && rm -rf /var/cache/apk/*

RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale
# Install pnpm
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
RUN chmod +x /tailscale.d/start.sh

CMD ["./start.sh && pnpm run start"]