import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const issueTokens = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tokenAuth`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    issueTokens();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isLogin ? <Landing setAccessToken={setAccessToken} setIsLogin={setIsLogin} /> : <Navigate to="/main" />
            }
          />
          <Route
            path="/main"
            element={
              <Main
                accessToken={accessToken}
                setIsLogin={setIsLogin}
                setAccessToken={setAccessToken}
                issueTokens={issueTokens}
              />
            }
          />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
