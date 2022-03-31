// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "object-src 'self' *.evolution2art.com; script-src 'self' *.evolution2art.com; font-src 'self' fonts.google.com; frame-ancestors 'self' *.evolution2art.com;",
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
