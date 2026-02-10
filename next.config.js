/** @type {import('next').NextConfig} */
const nextConfig = {};

// Fallback: set NEXTAUTH_URL from VERCEL_URL if not explicitly configured.
// For production, always set NEXTAUTH_URL explicitly in Vercel environment variables
// and add the matching redirect URI in Google Cloud Console.
if (process.env.VERCEL_URL && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
}

module.exports = nextConfig;
