/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // faviconなどの静的ファイルへのリクエストをCloudflare Pagesで適切に処理するための設定
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : '',
}

module.exports = nextConfig 