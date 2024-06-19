import React from 'react'

import { Metadata } from "next";
import  {HeaderCard, ProductGrid, CreateAdd} from '../components/dashboardUi/Cards';

export const metadata: Metadata = {
  title: "ShakibAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

// Example array of products
const productsArray = [
  {
    videoSrc: 'http://example.com/video1.mp4',
    title: 'Product 1',
    description: 'Description for Product 1',
  },
  {
    videoSrc: 'http://example.com/video2.mp4',
    title: 'Product 2',
    description: 'Description for Product 2',
  },
  {
    videoSrc: 'http://example.com/video1.mp4',
    title: 'Product 1',
    description: 'Description for Product 1',
  },
  {
    videoSrc: 'http://example.com/video2.mp4',
    title: 'Product 2',
    description: 'Description for Product 2',
  },
  {
    videoSrc: 'http://example.com/video1.mp4',
    title: 'Product 1',
    description: 'Description for Product 1',
  },
  {
    videoSrc: 'http://example.com/video2.mp4',
    title: 'Product 2',
    description: 'Description for Product 2',
  },
  {
    videoSrc: 'http://example.com/video1.mp4',
    title: 'Product 1',
    description: 'Description for Product 1',
  },
  {
    videoSrc: 'http://example.com/video2.mp4',
    title: 'Product 2',
    description: 'Description for Product 2',
  },
  // Add more product objects as needed
];

function Dashboard() {
  const columns = [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [{ id: 'task-1', content: 'Task 1' }, { id: 'task-2', content: 'Task 2' }],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [{ id: 'task-3', content: 'Task 3' }],
    },
    // Add more columns as needed
  ];
  return (
    
      <div >
        <HeaderCard/>
        <div style={{ padding: '2rem' }}>
          <CreateAdd/>
        <ProductGrid products={productsArray}/>
        </div>
        
        
      </div>
  
    
  )
}

export default Dashboard;