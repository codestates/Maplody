import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const issueTokens = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data.userInfo);
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    issueTokens();
  }, []);

  const loginHandler = () => {
    issueTokens();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isLogin ? (
            <Route
              path="/main"
              element={<Main accessToken={accessToken} setAccessToken={setAccessToken} userInfo={userInfo} />}
            />
          ) : (
            <Route
              exact
              path="/"
              element={
                <Landing
                  loginHandler={loginHandler}
                  setAccessToken={setAccessToken}
                  setIsLogin={setIsLogin}
                  setUserInfo={setUserInfo}
                />
              }
            />
          )}
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
