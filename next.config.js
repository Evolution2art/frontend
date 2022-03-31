// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "object-src 'self'; script-src 'self'; font-src 'self' fonts.google.com; frame-ancestors 'self' *.evolution2art.com; require-trusted-types-for 'script';",
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
