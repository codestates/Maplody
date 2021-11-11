import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <p>hello world SUDO_HIRED!</p>
      </header>
=======
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 83b67355a6d1c58f79a9c4a808422c15cf939da7
    </div>
  );
}

export default App;
