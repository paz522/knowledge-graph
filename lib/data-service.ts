'use client';

import { GraphData, Node, Link } from './types';
import { sampleGraphData } from './sample-data';

// ローカルストレージのキー
const STORAGE_KEY = 'knowledge-graph-data';

/**
 * クライアントサイドでのデータ操作を行うサービスクラス
 */
export class DataService {
  private data: GraphData;
  
  constructor() {
    this.data = this.loadFromLocalStorage() || this.getInitialData();
  }
  
  /**
   * ローカルストレージからデータを読み込む
   */
  private loadFromLocalStorage(): GraphData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
      return null;
    }
  }
  
  /**
   * ローカルストレージにデータを保存する
   */
  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }
  
  /**
   * 初期データを取得する（サンプルデータを使用）
   */
  private getInitialData(): GraphData {
    return JSON.parse(JSON.stringify(sampleGraphData));
  }
  
  /**
   * 現在のグラフデータを取得
   */
  getGraphData(): GraphData {
    return this.data;
  }
  
  /**
   * ノードをIDで検索
   */
  getNodeById(id: string): Node | undefined {
    return this.data.nodes.find(node => node.id === id);
  }
  
  /**
   * 新しいノードを追加
   */
  addNode(node: Node): void {
    this.data.nodes.push(node);
    this.saveToLocalStorage();
  }
  
  /**
   * ノードを更新
   */
  updateNode(updatedNode: Node): void {
    const index = this.data.nodes.findIndex(node => node.id === updatedNode.id);
    if (index !== -1) {
      this.data.nodes[index] = updatedNode;
      this.saveToLocalStorage();
    }
  }
  
  /**
   * ノードを削除
   */
  deleteNode(nodeId: string): void {
    this.data.nodes = this.data.nodes.filter(node => node.id !== nodeId);
    
    // 関連するリンクも削除
    this.data.links = this.data.links.filter(
      link => link.source !== nodeId && link.target !== nodeId
    );
    
    this.saveToLocalStorage();
  }
  
  /**
   * 新しいリンクを追加
   */
  addLink(link: Link): void {
    this.data.links.push(link);
    this.saveToLocalStorage();
  }
  
  /**
   * リンクを削除
   */
  deleteLink(source: string, target: string): void {
    this.data.links = this.data.links.filter(
      link => !(link.source === source && link.target === target)
    );
    this.saveToLocalStorage();
  }
  
  /**
   * データをエクスポート
   */
  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }
  
  /**
   * データをリセット
   */
  resetData(): void {
    this.data = this.getInitialData();
    this.saveToLocalStorage();
  }
}

// サーバーサイドレンダリング用のダミーサービス
export class DummyDataService implements Omit<DataService, 'loadFromLocalStorage' | 'saveToLocalStorage' | 'getInitialData'> {
  private data: GraphData = JSON.parse(JSON.stringify(sampleGraphData));
  
  getGraphData(): GraphData {
    return this.data;
  }
  
  getNodeById(): Node | undefined {
    return undefined;
  }
  
  addNode(): void {}
  updateNode(): void {}
  deleteNode(): void {}
  addLink(): void {}
  deleteLink(): void {}
  
  exportData(): string {
    return '';
  }
  
  resetData(): void {}
}

// シングルトンインスタンスを作成
let dataServiceInstance: DataService | DummyDataService | null = null;

export function getDataService(): DataService | DummyDataService {
  if (typeof window !== 'undefined' && !dataServiceInstance) {
    dataServiceInstance = new DataService();
  } else if (!dataServiceInstance) {
    dataServiceInstance = new DummyDataService();
  }
  
  return dataServiceInstance;
} 