// @/app/lib/providers/ad-studio-provider.tsx
import React, {
	createContext,
	useContext,
	useState,
	useReducer,
	ReactNode,
} from 'react';

// Define the types for our nodes and connections
interface Node {
	id: string;
	type: string;
	position: { x: number; y: number };
	label?: string; // Add this property
	description?: string; // Add this property
	data: Record<string, any>;
}

interface Connection {
	id: string;
	sourceId: string;
	targetId: string;
	sourceHandle?: string;
	targetHandle?: string;
}

// Define the state interface
interface AdStudioState {
	nodes: Node[];
	connections: Connection[];
	selectedNodeId: string | null;
	zoom: number;
	projectId: string | null;
	isDragging: boolean;
	history: {
		past: { nodes: Node[]; connections: Connection[] }[];
		future: { nodes: Node[]; connections: Connection[] }[];
	};
}

// Define action types
type AdStudioAction =
	| { type: 'ADD_NODE'; payload: Node }
	| { type: 'UPDATE_NODE'; payload: { id: string; data: Partial<Node> } }
	| { type: 'REMOVE_NODE'; payload: string }
	| { type: 'ADD_CONNECTION'; payload: Connection }
	| { type: 'REMOVE_CONNECTION'; payload: string }
	| { type: 'SET_SELECTED_NODE'; payload: string | null }
	| { type: 'SET_ZOOM'; payload: number }
	| { type: 'SET_PROJECT_ID'; payload: string | null }
	| { type: 'SET_DRAGGING'; payload: boolean }
	| { type: 'UNDO' }
	| { type: 'REDO' }
	| {
			type: 'LOAD_PROJECT';
			payload: { nodes: Node[]; connections: Connection[] };
	  };

// Initial state
const initialState: AdStudioState = {
	nodes: [],
	connections: [],
	selectedNodeId: null,
	zoom: 1,
	projectId: null,
	isDragging: false,
	history: {
		past: [],
		future: [],
	},
};

// Create context
const AdStudioContext = createContext<{
	state: AdStudioState;
	dispatch: React.Dispatch<AdStudioAction>;
	addNode: (node: Omit<Node, 'id'>) => void;
	updateNode: (id: string, data: Partial<Node>) => void;
	removeNode: (id: string) => void;
	addConnection: (connection: Omit<Connection, 'id'>) => void;
	removeConnection: (id: string) => void;
	selectNode: (id: string | null) => void;
	setZoom: (zoom: number) => void;
	setProjectId: (id: string | null) => void;
	undo: () => void;
	redo: () => void;
	loadProject: (data: { nodes: Node[]; connections: Connection[] }) => void;
}>({
	state: initialState,
	dispatch: () => null,
	addNode: () => {},
	updateNode: () => {},
	removeNode: () => {},
	addConnection: () => {},
	removeConnection: () => {},
	selectNode: () => {},
	setZoom: () => {},
	setProjectId: () => {},
	undo: () => {},
	redo: () => {},
	loadProject: () => {},
});

// Reducer function
function adStudioReducer(
	state: AdStudioState,
	action: AdStudioAction
): AdStudioState {
	switch (action.type) {
		case 'ADD_NODE': {
			const newState = {
				...state,
				nodes: [...state.nodes, action.payload],
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: [],
				},
			};
			return newState;
		}

		case 'UPDATE_NODE': {
			const { id, data } = action.payload;
			const newNodes = state.nodes.map((node) =>
				node.id === id ? { ...node, ...data } : node
			);

			return {
				...state,
				nodes: newNodes,
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: [],
				},
			};
		}

		case 'REMOVE_NODE': {
			const newNodes = state.nodes.filter((node) => node.id !== action.payload);
			const newConnections = state.connections.filter(
				(conn) =>
					conn.sourceId !== action.payload && conn.targetId !== action.payload
			);

			return {
				...state,
				nodes: newNodes,
				connections: newConnections,
				selectedNodeId:
					state.selectedNodeId === action.payload ? null : state.selectedNodeId,
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: [],
				},
			};
		}

		case 'ADD_CONNECTION': {
			return {
				...state,
				connections: [...state.connections, action.payload],
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: [],
				},
			};
		}

		case 'REMOVE_CONNECTION': {
			return {
				...state,
				connections: state.connections.filter(
					(conn) => conn.id !== action.payload
				),
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: [],
				},
			};
		}

		case 'SET_SELECTED_NODE': {
			return {
				...state,
				selectedNodeId: action.payload,
			};
		}

		case 'SET_ZOOM': {
			return {
				...state,
				zoom: action.payload,
			};
		}

		case 'SET_PROJECT_ID': {
			return {
				...state,
				projectId: action.payload,
			};
		}

		case 'SET_DRAGGING': {
			return {
				...state,
				isDragging: action.payload,
			};
		}

		case 'UNDO': {
			if (state.history.past.length === 0) return state;

			const previous = state.history.past[state.history.past.length - 1];
			const newPast = state.history.past.slice(
				0,
				state.history.past.length - 1
			);

			return {
				...state,
				nodes: previous.nodes,
				connections: previous.connections,
				history: {
					past: newPast,
					future: [
						{ nodes: state.nodes, connections: state.connections },
						...state.history.future,
					],
				},
			};
		}

		case 'REDO': {
			if (state.history.future.length === 0) return state;

			const next = state.history.future[0];
			const newFuture = state.history.future.slice(1);

			return {
				...state,
				nodes: next.nodes,
				connections: next.connections,
				history: {
					past: [
						...state.history.past,
						{ nodes: state.nodes, connections: state.connections },
					],
					future: newFuture,
				},
			};
		}

		case 'LOAD_PROJECT': {
			return {
				...state,
				nodes: action.payload.nodes,
				connections: action.payload.connections,
				selectedNodeId: null,
				history: {
					past: [],
					future: [],
				},
			};
		}

		default:
			return state;
	}
}

// Provider component
export function AdStudioProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(adStudioReducer, initialState);

	// Helper functions
	const addNode = (node: Omit<Node, 'id'>) => {
		const id = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
		dispatch({ type: 'ADD_NODE', payload: { id, ...node } });
	};

	const updateNode = (id: string, data: Partial<Node>) => {
		dispatch({ type: 'UPDATE_NODE', payload: { id, data } });
	};

	const removeNode = (id: string) => {
		dispatch({ type: 'REMOVE_NODE', payload: id });
	};

	const addConnection = (connection: Omit<Connection, 'id'>) => {
		const id = `conn-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
		dispatch({ type: 'ADD_CONNECTION', payload: { id, ...connection } });
	};

	const removeConnection = (id: string) => {
		dispatch({ type: 'REMOVE_CONNECTION', payload: id });
	};

	const selectNode = (id: string | null) => {
		dispatch({ type: 'SET_SELECTED_NODE', payload: id });
	};

	const setZoom = (zoom: number) => {
		dispatch({ type: 'SET_ZOOM', payload: zoom });
	};

	const setProjectId = (id: string | null) => {
		dispatch({ type: 'SET_PROJECT_ID', payload: id });
	};

	const undo = () => {
		dispatch({ type: 'UNDO' });
	};

	const redo = () => {
		dispatch({ type: 'REDO' });
	};

	const loadProject = (data: { nodes: Node[]; connections: Connection[] }) => {
		dispatch({ type: 'LOAD_PROJECT', payload: data });
	};

	return (
		<AdStudioContext.Provider
			value={{
				state,
				dispatch,
				addNode,
				updateNode,
				removeNode,
				addConnection,
				removeConnection,
				selectNode,
				setZoom,
				setProjectId,
				undo,
				redo,
				loadProject,
			}}>
			{children}
		</AdStudioContext.Provider>
	);
}

// Custom hook for using the context
export function useAdStudio() {
	const context = useContext(AdStudioContext);
	if (context === undefined) {
		throw new Error('useAdStudio must be used within an AdStudioProvider');
	}
	return context;
}
