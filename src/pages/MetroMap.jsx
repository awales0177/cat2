import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// ✅ Metro station style (small circular nodes)
const nodeStyle = {
  width: '14px', // ✅ Slightly larger for better visibility
  height: '14px',
  borderRadius: '50%', // Circular shape
  border: '2px solid black', // ⚫ Metro contrast (black border on white background)
  backgroundColor: '#FF5733', // Default color
};

// ✅ Define metro stations (with unique IDs)
const initialNodes = [
  { id: 'A', position: { x: 100, y: 300 }, data: { label: 'Central Hub', color: '#FF5733' }, type: 'custom' },
  { id: 'B', position: { x: 300, y: 300 }, data: { label: 'West Point', color: '#33FF57' }, type: 'custom' },
  { id: 'C', position: { x: 500, y: 300 }, data: { label: 'East Gate', color: '#5733FF' }, type: 'custom' },
  { id: 'D', position: { x: 700, y: 300 }, data: { label: 'North Side', color: '#F39C12' }, type: 'custom' },
  { id: 'E', position: { x: 900, y: 300 }, data: { label: 'South Pier', color: '#E74C3C' }, type: 'custom' },
  { id: 'F', position: { x: 500, y: 150 }, data: { label: 'Tech Park', color: '#3498DB' }, type: 'custom' },
  { id: 'G', position: { x: 500, y: 450 }, data: { label: 'Industrial Zone', color: '#9B59B6' }, type: 'custom' },
];

// ✅ Metro lines (curved paths with valid `source` and `target`)
const initialEdges = [
  { id: 'A-B', source: 'A', target: 'B', type: 'smoothstep', animated: true, style: { stroke: '#FF5733', strokeWidth: 3 } }, // Red Line
  { id: 'B-C', source: 'B', target: 'C', type: 'smoothstep', animated: true, style: { stroke: '#FF5733', strokeWidth: 3 } },
  { id: 'C-D', source: 'C', target: 'D', type: 'smoothstep', animated: true, style: { stroke: '#FF5733', strokeWidth: 3 } },
  { id: 'D-E', source: 'D', target: 'E', type: 'smoothstep', animated: true, style: { stroke: '#FF5733', strokeWidth: 3 } },

  { id: 'C-F', source: 'C', target: 'F', type: 'smoothstep', animated: true, style: { stroke: '#3498DB', strokeWidth: 3 } }, // Blue Line
  { id: 'C-G', source: 'C', target: 'G', type: 'smoothstep', animated: true, style: { stroke: '#9B59B6', strokeWidth: 3 } }, // Purple Line
];

// ✅ Custom Node Component with Handles (Ensures edges connect)
const CustomNode = ({ data }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* Metro Station Label Positioned Above */}
      <div
        style={{
          position: 'absolute',
          top: '-20px', // Moves label above station
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'black', // ⚫ Black for contrast
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        {data.label}
      </div>

      {/* Metro Station (Small Circle) */}
      <div style={{ ...nodeStyle, backgroundColor: data.color }}></div>

      {/* ✅ Handles to Allow Edges to Connect */}
      <Handle type="source" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <Handle type="source" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="target" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// ✅ Style for Handles (Invisible but Functional)
const handleStyle = { width: '6px', height: '6px', background: 'transparent' };

const nodeTypes = { custom: CustomNode }; // ✅ Register Custom Node Type

const MetroMap = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: '90vh', width: '100vw', background: 'white' }}> {/* ✅ White Background */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // ✅ Use Custom Nodes
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap nodeColor={(node) => node.data.color} maskColor="rgba(0,0,0,0.1)" />
        <Controls />
        <Background gap={15} color="#ddd" /> {/* ✅ Light Grid */}
      </ReactFlow>
    </div>
  );
};

export default MetroMap;
