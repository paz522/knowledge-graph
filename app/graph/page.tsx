'use client';

import React, { useState, useEffect } from 'react';
import { sampleGraphData } from '../../lib/sample-data';
import GraphView from '../../components/graph-view';
import Modal from '../../components/modal';
import { Node, Link, GraphData } from '../../lib/types';

export default function GraphPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('graph');
  const [graphData, setGraphData] = useState<GraphData>(sampleGraphData);
  const [showModal, setShowModal] = useState(false);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // フィルタリングされたノードを取得
  const filteredNodes = graphData.nodes.filter(node => 
    node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (node.description && node.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (node.category && node.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // フィルタリングされたノードのIDを取得
  const filteredNodeIds = filteredNodes.map(node => node.id);

  // フィルタリングされたノードに関連するリンクを取得
  const filteredLinks = graphData.links.filter(link => 
    filteredNodeIds.includes(link.source) && filteredNodeIds.includes(link.target)
  );

  // フィルタリングされたグラフデータ
  const filteredGraphData: GraphData = {
    nodes: filteredNodes,
    links: filteredLinks
  };

  // ノード作成/編集フォームの送信ハンドラ
  const handleNodeSubmit = (node: Node) => {
    if (isEditing && currentNode) {
      // 既存のノードを更新
      setGraphData(prevData => ({
        ...prevData,
        nodes: prevData.nodes.map(n => n.id === node.id ? node : n)
      }));
    } else {
      // 新しいノードを作成
      setGraphData(prevData => ({
        ...prevData,
        nodes: [...prevData.nodes, node]
      }));
    }
    setShowModal(false);
    setCurrentNode(null);
    setIsEditing(false);
  };

  // ノード削除ハンドラ
  const handleDeleteNode = (nodeId: string) => {
    setGraphData(prevData => ({
      nodes: prevData.nodes.filter(node => node.id !== nodeId),
      links: prevData.links.filter(link => 
        link.source !== nodeId && link.target !== nodeId
      )
    }));
    setCurrentNode(null);
  };

  // ノード選択ハンドラ
  const handleSelectNode = (node: Node) => {
    setCurrentNode(node);
  };

  // グラフデータのエクスポート
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(graphData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "knowledge-graph.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              知識グラフ
            </h1>
            
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ノードを検索..."
                  className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setSearchTerm('')}
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === 'graph'
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('graph')}
                >
                  グラフ
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === 'list'
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('list')}
                >
                  リスト
                </button>
              </div>
              
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentNode(null);
                  setShowModal(true);
                }}
              >
                + 新規ノード
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-1 h-[calc(100vh-16rem)]">
            {activeTab === 'graph' ? (
              <GraphView 
                data={filteredGraphData} 
                onSelectNode={handleSelectNode}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {filteredNodes.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          ラベル
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          カテゴリ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          説明
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          作成日
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">編集</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredNodes.map((node) => (
                        <tr key={node.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: node.color || '#4299e1' }}></div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{node.label}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{node.category || '未分類'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{node.description || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(node.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                              onClick={() => {
                                setCurrentNode(node);
                                setIsEditing(true);
                                setShowModal(true);
                              }}
                            >
                              編集
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              onClick={() => handleDeleteNode(node.id)}
                            >
                              削除
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                    <p>表示するノードがありません。</p>
                    <p className="mt-2">検索条件を変更するか、新しいノードを作成してください。</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* アクションボタン */}
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
              onClick={handleExport}
            >
              エクスポート
            </button>
          </div>
        </div>
      </div>
      
      {/* モーダル */}
      {showModal && (
        <Modal
          title={isEditing ? "ノードを編集" : "新規ノード作成"}
          onClose={() => {
            setShowModal(false);
            setCurrentNode(null);
            setIsEditing(false);
          }}
        >
          <div className="p-4">
            {/* ノードフォームをここに実装 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ラベル
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="ノード名を入力"
                  value={currentNode?.label || ''}
                  onChange={(e) => {
                    if (currentNode) {
                      setCurrentNode({ ...currentNode, label: e.target.value });
                    } else {
                      setCurrentNode({
                        id: Date.now().toString(),
                        label: e.target.value,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      });
                    }
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  説明
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="ノードの詳細説明"
                  rows={3}
                  value={currentNode?.description || ''}
                  onChange={(e) => {
                    if (currentNode) {
                      setCurrentNode({ ...currentNode, description: e.target.value });
                    }
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  カテゴリ
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={currentNode?.category || ''}
                  onChange={(e) => {
                    if (currentNode) {
                      setCurrentNode({ ...currentNode, category: e.target.value });
                    }
                  }}
                >
                  <option value="">カテゴリを選択</option>
                  <option value="technology">技術</option>
                  <option value="concept">概念</option>
                  <option value="person">人物</option>
                  <option value="organization">組織</option>
                  <option value="event">イベント</option>
                  <option value="place">場所</option>
                  <option value="discipline">学問</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  カラー
                </label>
                <input
                  type="color"
                  className="w-full h-10 px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentNode?.color || '#4299e1'}
                  onChange={(e) => {
                    if (currentNode) {
                      setCurrentNode({ ...currentNode, color: e.target.value });
                    }
                  }}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentNode(null);
                    setIsEditing(false);
                  }}
                >
                  キャンセル
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  onClick={() => {
                    if (currentNode && currentNode.label) {
                      handleNodeSubmit({
                        ...currentNode,
                        updatedAt: new Date().toISOString()
                      });
                    }
                  }}
                  disabled={!currentNode || !currentNode.label}
                >
                  {isEditing ? "更新" : "作成"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
} 