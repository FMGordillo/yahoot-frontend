// @ts-check

const securityHeaders = [
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protectionhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
    {
  key: 'X-XSS-Protection',
  value: '1; mode=block'
}
]

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig;
