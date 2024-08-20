'use client'

import React, { useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { HeaderCard, ProductGrid, CreateAdd } from '../components/dashboardUi/Cards';

// Example array of products
const productsArray = [
  // ... your product data
  {
         videoSrc: 'https://www.youtube.com/watch?v=sxn2GPQjJgc',
         title: 'Product 1',
        description: 'Description for Product 1',
       },
       {
         videoSrc: 'http://example.com/video2.mp4',
         title: 'Product 2',
         description: 'Description for Product 2',
       }
];

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  //const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
  const convex = useConvex();

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        picture: user.picture,
        phone: user.phone,
        location: user.location
      }).then((resp) => {
        console.log(resp);
      });
    }
  };

  return (
    <div className="lg:pl-[16.1rem] md:pl-[2rem] pt-[6.2rem] sm:pl-0">
      <HeaderCard />
      <div>
        <div className="py-4 md:py-6 sm:pl-1rem">
          <CreateAdd />
        </div>
        <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Adjust the number of columns based on screen size */}
          <ProductGrid products={productsArray} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
