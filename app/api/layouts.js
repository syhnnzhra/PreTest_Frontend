// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My CRUD App</h1>
        {/* Add navigation or other header content here */}
      </header>

      <main>{children}</main>

      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default Layout;
