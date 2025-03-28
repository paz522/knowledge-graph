import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Knowledge Graphについて
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            このアプリについて
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Knowledge Graphは、あなたの知識やアイディアをグラフ形式で視覚化するためのツールです。
            情報を単なるリストやノートとしてではなく、関連性を持ったネットワークとして整理することで、
            新しい発見や深い理解を促進します。
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            D3.jsを使用した力学モデル（Force-Directed）グラフにより、
            情報間の関係性を直感的に把握できます。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            主な機能
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>知識ノードの作成、編集、削除</li>
            <li>ノード間の関連性を表すリンクの設定</li>
            <li>ノードのカテゴリ分類とカラー表示</li>
            <li>直感的なドラッグ＆ドロップ操作</li>
            <li>グラフのズーム・パン機能</li>
            <li>キーワード検索によるノードフィルタリング</li>
            <li>グラフデータのJSONエクスポート</li>
            <li>リストビューとグラフビューの切り替え</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            使い方
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
            <li className="mb-2">
              <span className="font-medium">ノードの作成：</span>
              <p className="mt-1 ml-6">
                「+ 新規ノード」ボタンをクリックして、ノードの名前、説明、カテゴリを入力します。
              </p>
            </li>
            <li className="mb-2">
              <span className="font-medium">ノードの編集：</span>
              <p className="mt-1 ml-6">
                グラフ上のノードをクリックして選択し、「編集」ボタンを押すか、リストビューの編集ボタンをクリックします。
              </p>
            </li>
            <li className="mb-2">
              <span className="font-medium">グラフの操作：</span>
              <p className="mt-1 ml-6">
                マウスホイールでズームイン/アウト、ドラッグでパン（移動）、ノードをドラッグして位置を調整できます。
              </p>
            </li>
            <li className="mb-2">
              <span className="font-medium">データのエクスポート：</span>
              <p className="mt-1 ml-6">
                「エクスポート」ボタンをクリックすると、現在のグラフデータがJSONファイルとしてダウンロードされます。
              </p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            技術的情報
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            このアプリケーションは以下の技術で構築されています：
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Next.js（React フレームワーク）</li>
            <li>TypeScript</li>
            <li>D3.js（データ可視化ライブラリ）</li>
            <li>TailwindCSS（スタイリング）</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 