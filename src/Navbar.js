import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <Link to="/page1">Page-1-link</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link to="/page2">Page-2-link</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link to="/page3">Page-3-link</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
