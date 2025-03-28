/** @type {import('next').NextConfig} */
const nextConfig = {
  // 常に静的エクスポートを有効にする
  output: 'export',
  distDir: 'out',
  // 静的エクスポートのための設定
  images: {
    unoptimized: true,
  },
  // クライアントサイドのルーティング用
  trailingSlash: true,
  // ベースパス設定
  basePath: '',
  // faviconなどの静的ファイルへのリクエストをCloudflare Pagesで適切に処理するための設定
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : '',
}

module.exports = nextConfig 