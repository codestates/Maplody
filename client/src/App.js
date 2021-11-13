import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Loading from './pages/Loading';
import Landing from './pages/Landing';
import SignoutModal from './components/SignoutModal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signout" element={<SignoutModal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
