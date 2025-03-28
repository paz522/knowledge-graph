'use client';

import { useEffect } from 'react';

export default function StyleInjector() {
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
        
        /* フレックスボックスのスタイル */
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1 1 0%; }
        .flex-wrap { flex-wrap: wrap; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-between: space-between; }
        
        /* コンテナとスペーシング */
        .container { width: 100%; margin-left: auto; margin-right: auto; }
        .min-h-screen { min-height: 100vh; }
        .p-4, .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        
        /* 色と背景 */
        .bg-white { background-color: #ffffff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-900 { background-color: #111827; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-400 { color: #9ca3af; }
        .border-t { border-top-width: 1px; }
        .border-gray-200 { border-color: #e5e7eb; }
        
        /* テキスト */
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-center { text-align: center; }
        
        /* ダークモード設定 */
        @media (prefers-color-scheme: dark) {
          html { color-scheme: dark; }
          .dark\\:bg-gray-900 { background-color: #111827; }
          .dark\\:border-gray-800 { border-color: #1f2937; }
          .dark\\:text-gray-400 { color: #9ca3af; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return null;
} 