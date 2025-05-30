// @/app/lib/types/ad-studio-types.ts

// Handle definition for inputs and outputs
export interface NodeHandle {
	id: string;
	type: string;
	label?: string;
}

// Node data structure
export interface NodeData {
	id: string;
	type: 'input' | 'transform' | 'output' | string;
	label: string;
	description: string;
	position: {
		x: number;
		y: number;
	};
	inputHandles?: NodeHandle[];
	outputHandles?: NodeHandle[];
	// Additional properties for specific node types can be added
	data?: Record<string, any>;
}

// Connection between nodes
export interface NodeConnection {
	id: string;
	sourceId: string;
	targetId: string;
	sourceHandle: string;
	targetHandle: string;
	// Optional data or styling properties
	type?: string;
	data?: Record<string, any>;
}

// Ad Studio state
export interface AdStudioState {
	nodes: NodeData[];
	connections: NodeConnection[];
	selectedNodeId: string | null;
	zoom: number;
	isDragging: boolean;
}

// Action types for updating state
export type NodeUpdateData = Partial<Omit<NodeData, 'id'>>;

export interface ConnectionData {
	sourceId: string;
	targetId: string;
	sourceHandle: string;
	targetHandle: string;
}

// Types for the context provider
export interface AdStudioContextType {
	state: AdStudioState;
	addNode: (node: Omit<NodeData, 'id'>) => string;
	updateNode: (id: string, data: NodeUpdateData) => void;
	removeNode: (id: string) => void;
	selectNode: (id: string | null) => void;
	addConnection: (connection: ConnectionData) => string;
	removeConnection: (id: string) => void;
	setZoom: (zoom: number) => void;
}
