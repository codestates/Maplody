import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing setAccessToken={setAccessToken} setIsLogin={setIsLogin} />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/main" element={<Main accessToken={accessToken} setAccessToken={setAccessToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
