'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          あなたの知識をグラフで可視化
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Knowledge Graphは、あなたのアイデア、考え、情報を整理し、
          視覚的に理解するためのツールです。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/graph/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            グラフを見る
          </Link>
          <Link
            href="/about/"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            詳細を見る
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">知識の可視化</h3>
            <p className="text-gray-600 dark:text-gray-300">
              情報を視覚的に整理することで、複雑な関係性を一目で把握できます。
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">シンプルな操作</h3>
            <p className="text-gray-600 dark:text-gray-300">
              直感的なインターフェースで、誰でも簡単に知識グラフを作成・編集できます。
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">関連性の発見</h3>
            <p className="text-gray-600 dark:text-gray-300">
              グラフ形式で表示することで、情報間の新しい関連性やパターンを発見できます。
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          今すぐ始めましょう
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          知識の整理と可視化で、あなたのアイデアに新たな価値を見つけましょう。
        </p>
        <button
          onClick={() => router.push('/graph/')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block"
        >
          知識グラフを作成する
        </button>
      </section>
    </div>
  );
} 