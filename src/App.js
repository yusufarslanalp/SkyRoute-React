import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const App = () => {
  return (
    <Router>
      <div>
      <h1 className="title">Welcome To My App</h1>
        
        {/* Flex container for navbar and page content */}
        <div style={{ display: 'flex' }}>
          {/* Navbar with 3/12 width */}
          <div style={{ width: '25%', padding: '10px' }}>
            <Navbar />
          </div>
          
          {/* Page content with 9/12 width */}
          <div style={{ width: '75%', padding: '10px' }}>
            {/* Routing Pages */}
            <Routes>
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Page3 />} />
            </Routes>
            
            {/* Default Content */}
            <div>Page Content (Hello From Page Content)</div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
