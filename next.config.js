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
  // ホスティング用の設定
  webpack: (config) => {
    return config;
  },
  // Cloudflareページのホスティング設定
  experimental: {
    optimizeCss: true,
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig 