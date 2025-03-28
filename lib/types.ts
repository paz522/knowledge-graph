// 知識グラフのノードを表すインターフェース
export interface Node {
  id: string;
  label: string;
  description?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
  size?: number;
}

// ノード間の関連付けを表すインターフェース
export interface Link {
  source: string;
  target: string;
  label?: string;
  strength?: number;
  color?: string;
}

// 知識グラフのデータモデル
export interface GraphData {
  nodes: Node[];
  links: Link[];
} 