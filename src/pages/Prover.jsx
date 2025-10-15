import { useState } from 'react';
import { Link } from 'react-router-dom';

const snarkjs = window.snarkjs;

function Prover() {
  const [secret, setSecret] = useState('');
  const [proof, setProof] = useState(null);
  const [publicSignals, setPublicSignals] = useState(null);
  const [proofCode, setProofCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateProof = async () => {
    if (!secret) {
      setError('Please enter a secret number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { proof: generatedProof, publicSignals: signals } = await snarkjs.groth16.fullProve(
        { secret: parseInt(secret) },
        '/zkp/circuit.wasm',
        '/zkp/circuit_0000.zkey'
      );

      setProof(generatedProof);
      setPublicSignals(signals);
      
      // Create a shareable proof code
      const proofData = {
        proof: generatedProof,
        publicSignals: signals,
        timestamp: new Date().toISOString()
      };
      
      const encoded = btoa(JSON.stringify(proofData));
      setProofCode(encoded);
      setError(null);
    } catch (err) {
      console.error('Proof generation error:', err);
      setError(`Failed to generate proof: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyProofCode = () => {
    navigator.clipboard.writeText(proofCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSecret('');
    setProof(null);
    setPublicSignals(null);
    setProofCode('');
    setError(null);
    setCopied(false);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo" style={{background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', fontWeight: '900'}}>ZK</div>
          <h1 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '2px'}}>PROVER INTERFACE</h1>
          <p className="subtitle" style={{color: '#888888', fontWeight: '500', letterSpacing: '2px'}}>GENERATE ZERO-KNOWLEDGE PROOF</p>
          <Link to="/" className="back-link" style={{color: '#ffffff', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid #333', borderRadius: '8px', transition: 'all 0.3s'}}>← BACK</Link>
        </header>

        <div className="content">
          <div className="main-card" style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)'}}>
            <h2 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1rem'}}>GENERATE YOUR PROOF</h2>
            
            <div style={{marginBottom: '1.5rem'}}>
              <label htmlFor="secret" style={{display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: '600', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase'}}>Secret Number</label>
              <input
                id="secret"
                type="number"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter number..."
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#000000',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontWeight: '700',
                  letterSpacing: '2px'
                }}
              />
              <p style={{marginTop: '0.75rem', fontSize: '0.85rem', color: '#666666', letterSpacing: '0.5px'}}>■ Keep this number secret - never share it</p>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button
                onClick={generateProof}
                disabled={loading || !secret}
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
                  cursor: loading || !secret ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
              >
                {loading ? 'GENERATING...' : 'GENERATE PROOF'}
              </button>
              
              {proof && (
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
                  RESET
                </button>
              )}
            </div>

            {error && (
              <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none', marginTop: '1rem'}}>
                <p style={{color: '#ffffff', fontWeight: '600', margin: 0}}>{error}</p>
              </div>
            )}
          </div>

          {proofCode && (
            <div style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)', padding: '2rem', borderRadius: '12px'}}>
              <h3 style={{color: '#ffffff', fontWeight: '700', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase'}}>PROOF GENERATED SUCCESSFULLY</h3>
              
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem'}}>Your Secret Hash</p>
                <div style={{background: '#000000', padding: '1rem', borderRadius: '8px', border: 'none'}}>
                  <pre style={{color: '#ffffff', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0, overflowX: 'auto'}}>{publicSignals[0]}</pre>
                </div>
                <p style={{marginTop: '0.75rem', fontSize: '0.85rem', color: '#666666', letterSpacing: '0.5px'}}>
                  ■ The verifier will see this hash, but NOT your secret
                </p>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem'}}>Share This Proof Code</h4>
                <div onClick={copyProofCode} style={{background: '#000000', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', position: 'relative'}}>
                  <pre style={{color: '#ffffff', fontFamily: 'monospace', fontSize: '0.8rem', margin: 0, overflowX: 'auto'}}>{proofCode.substring(0, 100)}...
{proofCode.length} characters total</pre>
                  <div style={{position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: '#1a1a1a', padding: '0.5rem 1rem', borderRadius: '4px', color: '#888888', fontSize: '0.8rem', letterSpacing: '1px'}}>
                    {copied ? 'COPIED' : 'CLICK TO COPY'}
                  </div>
                </div>
                
                <button onClick={copyProofCode} style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  letterSpacing: '2px',
                  borderRadius: '8px',
                  background: copied ? '#1a1a1a' : '#ffffff',
                  color: copied ? '#888888' : '#000000',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}>
                  {copied ? 'COPIED TO CLIPBOARD' : 'COPY PROOF CODE'}
                </button>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem'}}>Next Steps</h4>
                <div style={{background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: 'none'}}>
                  <p style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.8', margin: 0}}>
                    ■ Copy the proof code above<br/>
                    ■ Send it to the verifier (email, message, etc.)<br/>
                    ■ They can verify it on the Verifier page<br/>
                    ■ They will NEVER learn your secret number ({secret})
                  </p>
                </div>
                
                <Link to="/verifier" style={{
                  display: 'block',
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  letterSpacing: '2px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}>
                  GO TO VERIFIER →
                </Link>
              </div>
            </div>
          )}

          {proof && (
            <div style={{background: '#0a0a0a', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)', padding: '2rem', borderRadius: '12px'}}>
              <details>
                <summary style={{color: '#888888', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '1rem'}}>TECHNICAL DETAILS (OPTIONAL)</summary>
                <div style={{background: '#000000', padding: '1rem', borderRadius: '8px', border: 'none', marginTop: '1rem'}}>
                  <pre style={{color: '#ffffff', fontFamily: 'monospace', fontSize: '0.75rem', margin: 0, overflowX: 'auto'}}>{JSON.stringify({ proof, publicSignals }, null, 2)}</pre>
                </div>
              </details>
            </div>
          )}
        </div>

        <footer style={{textAlign: 'center', padding: '2rem', borderTop: '1px solid #333', marginTop: '3rem'}}>
          <Link to="/verifier" style={{color: '#888888', textDecoration: 'none', letterSpacing: '1px', fontSize: '0.9rem', transition: 'color 0.3s'}}>
            VERIFY A PROOF →
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Prover;

