'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GraphData, Node, Link as GraphLink } from '../lib/types';
import * as d3 from 'd3';

interface GraphViewProps {
  data: GraphData;
  onSelectNode?: (node: Node) => void;
}

// D3.jsシミュレーションのための型定義
interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  color?: string;
  category?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: string | SimulationNode;
  target: string | SimulationNode;
  label?: string;
}

export default function GraphView({ data, onSelectNode }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [simulation, setSimulation] = useState<d3.Simulation<SimulationNode, SimulationLink> | null>(null);

  // グラフの初期化と更新を行う
  useEffect(() => {
    if (!containerRef.current || !data.nodes.length) return;

    // コンテナのサイズを取得
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // SVG要素の作成または取得
    let svg = svgRef.current;
    if (!svg) {
      svg = d3.select(containerRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;')
        .node() as SVGSVGElement;
      svgRef.current = svg;
    } else {
      d3.select(svg).selectAll('*').remove();
    }

    // ズーム機能の追加
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    d3.select(svg).call(zoom as any);

    // メインのグループ要素
    const g = d3.select(svg)
      .append('g')
      .attr('class', 'graph-container');

    // シミュレーションノードとリンクの作成
    const nodes: SimulationNode[] = data.nodes.map(node => ({
      ...node,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100
    }));

    const links: SimulationLink[] = data.links.map(link => ({
      source: link.source,
      target: link.target,
      label: link.label
    }));

    // リンクの描画
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);

    // ノードグループの作成
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag<any, SimulationNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // ノードの円を追加
    node.append('circle')
      .attr('r', d => getNodeRadius(d))
      .attr('fill', d => d.color || getCategoryColor(d.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    // カテゴリに基づいた半径を取得
    function getNodeRadius(d: SimulationNode): number {
      const baseSize = 8;
      
      // カテゴリに基づいて調整
      switch(d.category) {
        case 'technology': return baseSize * 1.2;
        case 'concept': return baseSize * 1.1;
        case 'person': return baseSize;
        case 'organization': return baseSize * 1.3;
        case 'event': return baseSize * 0.9;
        case 'place': return baseSize * 1.1;
        default: return baseSize;
      }
    }
    
    // カテゴリに基づいた色を取得
    function getCategoryColor(category?: string): string {
      switch(category) {
        case 'technology': return '#3B82F6'; // blue
        case 'concept': return '#10B981'; // green
        case 'person': return '#F59E0B'; // amber
        case 'organization': return '#6366F1'; // indigo
        case 'event': return '#EC4899'; // pink
        case 'place': return '#8B5CF6'; // purple
        case 'discipline': return '#7C3AED'; // violet
        default: return '#4299e1'; // default blue
      }
    }

    // ノードのラベルを追加
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => d.label)
      .attr('class', 'text-sm fill-current text-gray-800 dark:text-gray-200')
      .style('pointer-events', 'none');

    // ノードクリックイベントの追加
    node.on('click', (event, d) => {
      event.stopPropagation();
      const nodeData = data.nodes.find(n => n.id === d.id);
      if (nodeData) {
        setSelectedNode(nodeData);
        if (onSelectNode) {
          onSelectNode(nodeData);
        }
      }
    });

    // シミュレーションの作成
    const sim = d3.forceSimulation<SimulationNode, SimulationLink>(nodes)
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(links)
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1))
      .force('collision', d3.forceCollide().radius(30))
      .on('tick', ticked);

    setSimulation(sim);

    // シミュレーションの更新関数
    function ticked() {
      link
        .attr('x1', d => (d.source as SimulationNode).x || 0)
        .attr('y1', d => (d.source as SimulationNode).y || 0)
        .attr('x2', d => (d.target as SimulationNode).x || 0)
        .attr('y2', d => (d.target as SimulationNode).y || 0);

      node
        .attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
        
      // リンクラベルの位置更新
      d3.select(svg)
        .selectAll('.link-labels text')
        .data(links.filter(link => link.label))
        .attr('x', d => {
          const sourceX = (d.source as SimulationNode).x || 0;
          const targetX = (d.target as SimulationNode).x || 0;
          return (sourceX + targetX) / 2;
        })
        .attr('y', d => {
          const sourceY = (d.source as SimulationNode).y || 0;
          const targetY = (d.target as SimulationNode).y || 0;
          return (sourceY + targetY) / 2;
        });
    }

    // ドラッグ関連の関数
    function dragstarted(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      if (!event.active) sim.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      if (!event.active) sim.alphaTarget(0);
      if (!event.sourceEvent.shiftKey) {
        d.fx = null;
        d.fy = null;
      }
    }

    // リンクのラベルを追加（オプショナル）
    g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links.filter(link => link.label))
      .enter()
      .append('text')
      .attr('class', 'text-xs fill-current text-gray-600 dark:text-gray-400')
      .attr('text-anchor', 'middle')
      .attr('dy', -3)
      .text(d => d.label || '');

    // クリーンアップ関数
    return () => {
      sim.stop();
    };
  }, [data, onSelectNode]);

  // ノード情報を表示するサイドパネル
  const renderNodeDetails = () => {
    if (!selectedNode) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2">{selectedNode.label}</h3>
        {selectedNode.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {selectedNode.description}
          </p>
        )}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          カテゴリ: {selectedNode.category || '未分類'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          作成: {new Date(selectedNode.createdAt).toLocaleDateString()}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex">
      <div 
        ref={containerRef} 
        className="flex-1 bg-gray-50 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 relative overflow-hidden"
      >
        {data.nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <div>
              <p>表示するノードがありません。</p>
              <p className="mt-2">検索条件を変更するか、新しいノードを作成してください。</p>
            </div>
          </div>
        )}
      </div>
      
      {/* サイドパネル */}
      <div className="w-64 p-4 border-l border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4">ノード詳細</h2>
        {selectedNode ? (
          renderNodeDetails()
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ノードをクリックすると詳細が表示されます
          </p>
        )}
      </div>
    </div>
  );
} 