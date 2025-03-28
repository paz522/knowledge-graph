'use client';

import { useState, useEffect } from 'react';
import { Node } from '../lib/types';

interface NodeFormProps {
  node?: Node;
  onSubmit: (node: Node) => void;
  onCancel: () => void;
}

export default function NodeForm({ node, onSubmit, onCancel }: NodeFormProps) {
  // 既存のノードがある場合はそれを使用、ない場合は新規作成用の空のオブジェクト
  const [formData, setFormData] = useState<Partial<Node>>({
    id: node?.id || '',
    label: node?.label || '',
    description: node?.description || '',
    category: node?.category || 'other',
    color: node?.color || '#4299e1',
  });

  // 入力フィールドの変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 必須フィールドの検証
    if (!formData.label) {
      alert('ノード名を入力してください');
      return;
    }
    
    // 新規ノードの場合はIDを生成
    const isNewNode = !node?.id;
    const currentDate = new Date().toISOString();
    
    const submittedNode: Node = {
      id: isNewNode ? `node-${Date.now()}` : node.id,
      label: formData.label!,
      description: formData.description || '',
      category: formData.category || 'other',
      color: formData.color || '#4299e1',
      createdAt: isNewNode ? currentDate : node.createdAt,
      updatedAt: currentDate,
    };
    
    onSubmit(submittedNode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ノード名 *
        </label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          説明
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          カテゴリ
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="technology">テクノロジー</option>
          <option value="concept">概念</option>
          <option value="person">人物</option>
          <option value="organization">組織</option>
          <option value="event">イベント</option>
          <option value="place">場所</option>
          <option value="other">その他</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          色
        </label>
        <div className="flex items-center">
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-8 w-8 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            value={formData.color}
            onChange={handleChange}
            name="color"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          {node?.id ? '更新' : '作成'}
        </button>
      </div>
    </form>
  );
} 