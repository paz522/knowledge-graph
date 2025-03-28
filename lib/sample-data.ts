import { GraphData, Node, Link } from './types';

export const sampleNodes: Node[] = [
  {
    id: '1',
    label: '人工知能',
    description: '人間の知能を模倣するコンピュータシステム',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
  {
    id: '2',
    label: '機械学習',
    description: 'データから学習するアルゴリズム',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
  {
    id: '3',
    label: 'ニューラルネットワーク',
    description: '脳の神経回路を模倣した学習モデル',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
  {
    id: '4',
    label: 'データサイエンス',
    description: 'データから知見を得るための学問',
    category: 'discipline',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#ed8936',
  },
  {
    id: '5',
    label: '自然言語処理',
    description: '人間の言語をコンピュータで処理する技術',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
  {
    id: '6',
    label: 'ディープラーニング',
    description: '多層ニューラルネットワークによる学習手法',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
  {
    id: '7',
    label: 'コンピュータビジョン',
    description: '画像認識や物体検出などの視覚情報処理',
    category: 'technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#4299e1',
  },
];

export const sampleLinks: Link[] = [
  {
    source: '1',
    target: '2',
    label: '包含する',
    strength: 0.8,
  },
  {
    source: '2',
    target: '3',
    label: '使用する',
    strength: 0.7,
  },
  {
    source: '2',
    target: '6',
    label: '発展した',
    strength: 0.9,
  },
  {
    source: '3',
    target: '6',
    label: '基盤となる',
    strength: 0.9,
  },
  {
    source: '1',
    target: '5',
    label: '応用分野',
    strength: 0.6,
  },
  {
    source: '1',
    target: '7',
    label: '応用分野',
    strength: 0.6,
  },
  {
    source: '4',
    target: '2',
    label: '活用する',
    strength: 0.7,
  },
  {
    source: '6',
    target: '5',
    label: '使用される',
    strength: 0.8,
  },
  {
    source: '6',
    target: '7',
    label: '使用される',
    strength: 0.8,
  },
];

export const sampleGraphData: GraphData = {
  nodes: sampleNodes,
  links: sampleLinks,
}; 