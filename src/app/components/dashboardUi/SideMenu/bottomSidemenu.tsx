import React from 'react';
import Button from '../../ui/Button';


function BottomSidemenu() {
  const menuList = [
    {
      id: 1,
      name: 'Github',
      icon: 'icon',
      path: '',
    },
    {
      id: 2,
      name: 'Github',
      icon: 'icon',
      path: '',
    },
    {
      id: 3,
      name: 'Archive',
      icon: 'icon',
      path: '',
    },
  ];

  return (
    <div>
      {menuList.map((menu) => (
        <h2 key={menu.id} className='py-2'>
          <menu.icon />{menu.name}
        </h2>
      ))}
     
    </div>
  );
}

export default BottomSidemenu;
