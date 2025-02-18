import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import headerSvg from '../pics/metro.svg'; // Update this path to your SVG file

// ✅ Metro station style (small circular nodes)
const nodeStyle = {
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  border: '2px solid black',
};

const handleStyle = {
  width: '6px',
  height: '6px',
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  borderRadius: 0,         // Removes the circular shape
  pointerEvents: 'all',    // Still clickable for connections
};

// ✅ Define a more complex set of metro stations (sporadic layout)
const initialNodes = [
  { id: 'A', position: { x: 400, y: 300 }, data: { label: 'Central Hub', color: '#FF5733' }, type: 'custom' },
  { id: 'B', position: { x: 600, y: 300 }, data: { label: 'East Central', color: '#3498DB' }, type: 'custom' },
  { id: 'C', position: { x: 200, y: 300 }, data: { label: 'West Central', color: '#33FF57' }, type: 'custom' },
  { id: 'D', position: { x: 400, y: 150 }, data: { label: 'North Central', color: '#9B59B6' }, type: 'custom' },
  { id: 'E', position: { x: 400, y: 450 }, data: { label: 'South Central', color: '#F39C12' }, type: 'custom' },
  { id: 'F', position: { x: 650, y: 150 }, data: { label: 'North East', color: '#F1C40F' }, type: 'custom' },
  { id: 'G', position: { x: 150, y: 150 }, data: { label: 'North West', color: '#2980B9' }, type: 'custom' },
  { id: 'H', position: { x: 650, y: 450 }, data: { label: 'South East', color: '#E74C3C' }, type: 'custom' },
  { id: 'I', position: { x: 150, y: 450 }, data: { label: 'South West', color: '#8E44AD' }, type: 'custom' },
  { id: 'J', position: { x: 800, y: 300 }, data: { label: 'Far East', color: '#2ECC71' }, type: 'custom' },
  { id: 'K', position: { x: 50, y: 300 }, data: { label: 'Far West', color: '#16A085' }, type: 'custom' },
  { id: 'L', position: { x: 400, y: 50 }, data: { label: 'Far North', color: '#C0392B' }, type: 'custom' },
  { id: 'M', position: { x: 400, y: 550 }, data: { label: 'Far South', color: '#D35400' }, type: 'custom' },
];

// ✅ Define metro lines with explicit handle connections
const initialEdges = [
  { 
    id: 'A-B', 
    source: 'A', 
    target: 'B', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#FF5733', strokeWidth: 3 } 
  },
  { 
    id: 'A-C', 
    source: 'A', 
    target: 'C', 
    sourceHandle: 'left', 
    targetHandle: 'right',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#FF5733', strokeWidth: 3 } 
  },
  { 
    id: 'A-D', 
    source: 'A', 
    target: 'D', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#FF5733', strokeWidth: 3 } 
  },
  { 
    id: 'A-E', 
    source: 'A', 
    target: 'E', 
    sourceHandle: 'bottom', 
    targetHandle: 'top',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#FF5733', strokeWidth: 3 } 
  },
  { 
    id: 'B-J', 
    source: 'B', 
    target: 'J', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#3498DB', strokeWidth: 3 } 
  },
  { 
    id: 'C-K', 
    source: 'C', 
    target: 'K', 
    sourceHandle: 'left', 
    targetHandle: 'right',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#33FF57', strokeWidth: 3 } 
  },
  { 
    id: 'D-F', 
    source: 'D', 
    target: 'F', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#9B59B6', strokeWidth: 3 } 
  },
  { 
    id: 'D-L', 
    source: 'D', 
    target: 'L', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#9B59B6', strokeWidth: 3 } 
  },
  { 
    id: 'E-H', 
    source: 'E', 
    target: 'H', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#F39C12', strokeWidth: 3 } 
  },
  { 
    id: 'E-M', 
    source: 'E', 
    target: 'M', 
    sourceHandle: 'bottom', 
    targetHandle: 'top',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#F39C12', strokeWidth: 3 } 
  },
  { 
    id: 'F-J', 
    source: 'F', 
    target: 'J', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#F1C40F', strokeWidth: 3 } 
  },
  { 
    id: 'G-C', 
    source: 'G', 
    target: 'C', 
    sourceHandle: 'right', 
    targetHandle: 'left',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#2980B9', strokeWidth: 3 } 
  },
  { 
    id: 'I-C', 
    source: 'I', 
    target: 'C', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#8E44AD', strokeWidth: 3 } 
  },
  { 
    id: 'B-D', 
    source: 'B', 
    target: 'D', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#2ECC71', strokeWidth: 3 } 
  },
  { 
    id: 'B-E', 
    source: 'B', 
    target: 'E', 
    sourceHandle: 'left', 
    targetHandle: 'right',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#2ECC71', strokeWidth: 3 } 
  },
  { 
    id: 'C-D', 
    source: 'C', 
    target: 'D', 
    sourceHandle: 'right', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#16A085', strokeWidth: 3 } 
  },
  { 
    id: 'H-J', 
    source: 'H', 
    target: 'J', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#E74C3C', strokeWidth: 3 } 
  },
  { 
    id: 'I-K', 
    source: 'I', 
    target: 'K', 
    sourceHandle: 'left', 
    targetHandle: 'right',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#8E44AD', strokeWidth: 3 } 
  },
  { 
    id: 'L-D', 
    source: 'L', 
    target: 'D', 
    sourceHandle: 'bottom', 
    targetHandle: 'top',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#C0392B', strokeWidth: 3 } 
  },
  { 
    id: 'M-E', 
    source: 'M', 
    target: 'E', 
    sourceHandle: 'top', 
    targetHandle: 'bottom',
    type: 'smoothstep', 
    animated: true, 
    style: { stroke: '#D35400', strokeWidth: 3 } 
  },
];

// ✅ Custom Node Component with handles on all four sides.
const CustomNode = ({ data }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* Station Label Above */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        {data.label}
      </div>
      
      {/* Metro Station Circle */}
      <div style={{ ...nodeStyle, backgroundColor: data.color }}></div>
      
      {/* Source Handles */}
      <Handle type="source" position={Position.Top} id="top" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="right" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
      <Handle type="source" position={Position.Left} id="left" style={handleStyle} />
      
      {/* Target Handles */}
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} />
      <Handle type="target" position={Position.Right} id="right" style={handleStyle} />
      <Handle type="target" position={Position.Bottom} id="bottom" style={handleStyle} />
      <Handle type="target" position={Position.Left} id="left" style={handleStyle} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const MetroMap = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        background: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      {/* Title and SVG Section on the same line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', marginTop: '80px' }}>
        <h1 style={{ marginRight: '10px' }}>Metro Map</h1>
        <img src={headerSvg} alt="Header SVG" style={{ width: '50px', height: 'auto' }} />
      </div>

      {/* Description Section */}
      <div style={{ maxWidth: '800px', marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', lineHeight: 1.6 }}>
          Welcome to the interactive Metro Map! This detailed network diagram represents our metropolitan transit system, connecting key hubs across the region. Explore the dynamic layout of stations, each uniquely colored to signify its importance. Use the controls to navigate and zoom in on areas of interest, and discover how the various nodes interact to create a cohesive transportation web.
        </p>
      </div>

      {/* Metro Map Container */}
      <div style={{ width: '800px', height: '500px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          {/* Controls and Background remain, MiniMap removed */}
          <Controls />
          <Background gap={15} color="#ddd" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MetroMap;
