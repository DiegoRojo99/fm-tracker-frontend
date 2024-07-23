import React from 'react';
import Nav from './nav/Nav';

function Layout({ children }) {
  return (
    <div className='full'>
      <Nav />
      <div className='full'>
        {children}
      </div>
    </div>
  );
}

export default Layout;
