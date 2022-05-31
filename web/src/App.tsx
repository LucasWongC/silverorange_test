import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Repositry from './pages/Repositry';
import './App.css';

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo/:repoId" element={<Repositry />} />
        </Routes>
      </Router>
    </div>
  );
}
