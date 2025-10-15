import { useState } from 'react';
import { Link } from 'react-router-dom';

const snarkjs = window.snarkjs;

function Verifier() {
  const [proofCode, setProofCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proofDetails, setProofDetails] = useState(null);

  const verifyProof = async () => {
    if (!proofCode.trim()) {
      setError('Please paste a proof code');
      return;
    }

    setLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      // Decode the proof code
      const decodedData = JSON.parse(atob(proofCode.trim()));
      const { proof, publicSignals, timestamp } = decodedData;

      setProofDetails({
        hash: publicSignals[0],
        timestamp: new Date(timestamp).toLocaleString()
      });

      // Load verification key
      const vKeyResponse = await fetch('/zkp/verification_key.json');
      const vKey = await vKeyResponse.json();

      // Verify the proof
      const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);
      setVerificationResult(isValid);
      setError(null);
    } catch (err) {
      console.error('Verification error:', err);
      setError(`Failed to verify proof: ${err.message}. Make sure you copied the complete proof code.`);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setProofCode('');
    setVerificationResult(null);
    setError(null);
    setProofDetails(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo" style={{background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', fontWeight: '900'}}>ZK</div>
          <h1 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '2px'}}>VERIFIER INTERFACE</h1>
          <p className="subtitle" style={{color: '#888888', fontWeight: '500', letterSpacing: '2px'}}>VERIFY ZERO-KNOWLEDGE PROOFS</p>
          <Link to="/" className="back-link" style={{color: '#ffffff', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid #333', borderRadius: '8px', transition: 'all 0.3s'}}>← BACK</Link>
        </header>

        <div className="content">
          <div className="main-card" style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)'}}>
            <h2 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1rem'}}>VERIFY A PROOF</h2>
            
            <div style={{marginBottom: '1.5rem'}}>
              <label htmlFor="proofCode" style={{display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: '600', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase'}}>Proof Code</label>
              <textarea
                id="proofCode"
                value={proofCode}
                onChange={(e) => setProofCode(e.target.value)}
                placeholder="Paste the proof code here..."
                rows="6"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#000000',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  resize: 'vertical'
                }}
              />
              <p style={{marginTop: '0.75rem', fontSize: '0.85rem', color: '#666666', letterSpacing: '0.5px'}}>■ Paste the complete proof code received from the prover</p>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button
                onClick={verifyProof}
                disabled={loading || !proofCode.trim()}
                style={{
                  flex: 1,
                  padding: '1.25rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  letterSpacing: '2px',
                  borderRadius: '8px',
                  background: loading ? '#1a1a1a' : '#ffffff',
                  color: loading ? '#666666' : '#000000',
                  border: 'none',
                  cursor: loading || !proofCode.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
              >
                {loading ? 'VERIFYING...' : 'VERIFY PROOF'}
              </button>
              
              {(verificationResult !== null || error) && (
                <button
                  onClick={reset}
                  disabled={loading}
                  style={{
                    padding: '1.25rem',
                    fontSize: '1rem',
                    fontWeight: '800',
                    letterSpacing: '2px',
                    borderRadius: '8px',
                    background: '#1a1a1a',
                    color: '#888888',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase'
                  }}
                >
                  VERIFY ANOTHER
                </button>
              )}
            </div>

            {error && (
              <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none', marginTop: '1rem'}}>
                <p style={{color: '#ffffff', fontWeight: '600', margin: 0}}>{error}</p>
              </div>
            )}

            {verificationResult !== null && (
              <div style={{background: verificationResult ? '#000000' : '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none', marginTop: '1rem'}}>
                <h3 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem'}}>
                  {verificationResult ? 'PROOF IS VALID' : 'PROOF IS INVALID'}
                </h3>
                <p style={{color: '#888888', fontSize: '0.9rem', margin: 0}}>
                  {verificationResult
                    ? 'The prover has successfully proven they know a secret number that produces the given hash.'
                    : 'This proof could not be verified. It may be corrupted or invalid.'}
                </p>
              </div>
            )}
          </div>

          {proofDetails && verificationResult && (
            <div style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)', padding: '2rem', borderRadius: '12px'}}>
              <h3 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase'}}>VERIFICATION RESULTS</h3>
              
              <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none', marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #333'}}>
                  <span style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase'}}>Status</span>
                  <span style={{color: '#ffffff', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '700'}}>VALID</span>
                </div>
                
                <div style={{marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #333'}}>
                  <span style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem'}}>Secret Hash</span>
                  <span style={{color: '#ffffff', fontSize: '0.8rem', fontFamily: 'monospace', wordBreak: 'break-all'}}>{proofDetails.hash}</span>
                </div>
                
                <div>
                  <span style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem'}}>Proof Generated</span>
                  <span style={{color: '#ffffff', fontSize: '0.85rem', fontFamily: 'monospace'}}>{proofDetails.timestamp}</span>
                </div>
              </div>

              <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none', marginBottom: '1rem'}}>
                <h4 style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem'}}>What This Means</h4>
                <p style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.8', margin: 0}}>
                  ■ The prover knows a secret number<br/>
                  ■ That secret number produces the hash shown above<br/>
                  ■ The proof is cryptographically valid<br/>
                  ■ BUT - you still don't know their secret number
                </p>
              </div>

              <div style={{background: '#000000', padding: '1.5rem', borderRadius: '8px', border: 'none'}}>
                <h4 style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem'}}>How Zero-Knowledge Works</h4>
                <p style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '1rem'}}>
                  The prover created a cryptographic proof using their secret number. 
                  This proof mathematically guarantees they know a number that hashes to <code style={{background: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem'}}>{proofDetails.hash}</code>, 
                  but the proof itself doesn't contain or reveal the secret number.
                </p>
                <p style={{color: '#888888', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, fontStyle: 'italic'}}>
                  "I proved I have a key that opens this lock, without showing you the key or making a copy"
                </p>
              </div>
            </div>
          )}

          {proofDetails && !verificationResult && verificationResult !== null && (
            <div style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)', padding: '2rem', borderRadius: '12px'}}>
              <h3 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase'}}>VERIFICATION FAILED</h3>
              <p style={{color: '#888888', fontSize: '0.9rem', marginBottom: '1rem'}}>
                This proof could not be verified. Possible reasons:
              </p>
              <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none'}}>
                <p style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.8', margin: 0}}>
                  ■ The proof code was corrupted or incomplete<br/>
                  ■ The proof was tampered with<br/>
                  ■ The proof doesn't match the expected format
                </p>
              </div>
            </div>
          )}
        </div>

        <footer style={{textAlign: 'center', padding: '2rem', borderTop: '1px solid #333', marginTop: '3rem'}}>
          <Link to="/prover" style={{color: '#888888', textDecoration: 'none', letterSpacing: '1px', fontSize: '0.9rem', transition: 'color 0.3s'}}>
            GENERATE A PROOF →
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Verifier;

