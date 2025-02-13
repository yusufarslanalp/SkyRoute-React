import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome To My App</h1>
        <Navbar />
        
        {/* Routing Pages */}
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
        
        {/* Default Content */}
        <div>Page Content (Hello From Page Content)</div>
      </div>
    </Router>
  );
};

export default App;
