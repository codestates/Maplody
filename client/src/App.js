import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';
import { useState } from 'react';

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
          exact path="/" 
          element={<Landing />} 
          />
          <Route 
          path="/loading" 
          element={<Loading />} 
          />
          <Route 
          path="/main" 
          element={<Main />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
