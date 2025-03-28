'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Knowledge Graph',
  description: 'A knowledge graph visualization tool',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 開発環境とプロダクションでのスタイル適用をハンドリング
  useEffect(() => {
    // Tailwindのスタイルが適用されていない場合、手動で適用
    if (!document.querySelector('[data-tailwind-injected]')) {
      const style = document.createElement('style');
      style.setAttribute('data-tailwind-injected', 'true');
      style.textContent = `
        /* Tailwind の基本スタイル */
        *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; }
        html { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: ui-sans-serif, system-ui, sans-serif; }
        body { margin: 0; line-height: inherit; }
        h1, h2, h3 { font-size: inherit; font-weight: inherit; }
        a { color: inherit; text-decoration: inherit; }
        /* ダークモード設定 */
        @media (prefers-color-scheme: dark) {
          html { color-scheme: dark; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Knowledge Graph App. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 