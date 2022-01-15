import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

  const issueTokens = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/token-auth`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
      })
      .catch((err) => {
        setIsLogin(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '토큰이 만료되었으니 다시 로그인해주세요',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
      });
    navigate('/');
  };

  return (
    <div className="App">
      <Routes>
        {isLogin ? (
          <Route
            path="/"
            element={
              <Main
                accessToken={accessToken}
                setIsLogin={setIsLogin}
                issueTokens={issueTokens}
                setAccessToken={setAccessToken}
              />
            }
          />
        ) : (
          <Route path="/" element={<Landing setAccessToken={setAccessToken} setIsLogin={setIsLogin} />} />
        )}
        <Route
          path="/main"
          element={
            <Main
              accessToken={accessToken}
              setIsLogin={setIsLogin}
              issueTokens={issueTokens}
              setAccessToken={setAccessToken}
            />
          }
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
