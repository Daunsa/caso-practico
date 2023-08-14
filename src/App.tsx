import React from 'react';
import './App.css';

import Navbar from './Navbar/Navbar';
import Bar from './Lateral/Bar';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <Bar />
    </div>
  );
}

export default App;
