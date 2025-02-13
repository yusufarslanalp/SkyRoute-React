import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/page1">Page-1-link</Link>
        </li>
        <li>
          <Link to="/page2">Page-2-link</Link>
        </li>
        <li>
          <Link to="/page3">Page-3-link</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
