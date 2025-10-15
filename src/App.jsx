import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prover from './pages/Prover';
import Verifier from './pages/Verifier';
import BlockchainVerifier from './pages/BlockchainVerifier';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prover" element={<Prover />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/blockchain" element={<BlockchainVerifier />} />
      </Routes>
    </Router>
  );
}

export default App;
