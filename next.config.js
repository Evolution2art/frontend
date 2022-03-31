// next.config.js
const securityPolicy = `
default-src 'self';
script-src 'self';
font-src 'self' fonts.google.com;
frame-ancestors 'self' *.evolution2art.com;
`

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: securityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}
