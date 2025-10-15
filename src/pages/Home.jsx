import { Link } from 'react-router-dom';

function Home() {
  const cardStyle = {
    background: '#0a0a0a',
    borderRadius: '1.5rem',
    padding: '3rem 2.5rem',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #1a1a1a',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  };

  const hoverEffect = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  return (
    <div className="app">
      <style>{hoverEffect}</style>
      <div className="container" style={{maxWidth: '1400px'}}>
        {/* Hero Section */}
        <header style={{textAlign: 'center', padding: '4rem 0 3rem', position: 'relative'}}>
          <div style={{
            fontSize: '5rem', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            letterSpacing: '3px'
          }}>
            ZK-SNARK
          </div>
          
          <h1 style={{
            background: 'linear-gradient(135deg, #888888 0%, #444444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '300', 
            fontSize: '1.5rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            Zero-Knowledge Proof System
          </h1>
          
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #ffffff, #888888, #ffffff)',
            height: '1px',
            width: '200px',
            margin: '2rem auto',
            opacity: 0.3
          }}></div>
          
          <p style={{
            color: '#888888',
            fontSize: '1rem',
            letterSpacing: '2px',
            fontWeight: '400',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Prove knowledge without revealing secrets
          </p>
        </header>

        {/* Main Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '2rem 0',
          marginBottom: '3rem'
        }}>
          {/* Prover Card */}
          <Link to="/prover" style={cardStyle} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.1)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#1a1a1a';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '900',
              color: '#000000'
            }}>
              P
            </div>
            
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Prover
            </h3>
            
            <p style={{
              color: '#888888',
              fontSize: '0.95rem',
              lineHeight: '1.7',
              marginBottom: '2rem',
              minHeight: '60px'
            }}>
              Generate cryptographic proofs of secret knowledge
            </p>
            
            <div style={{
              padding: '1rem 2rem',
              background: '#ffffff',
              color: '#000000',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>
              Generate →
            </div>
          </Link>

          {/* Verifier Card */}
          <Link to="/verifier" style={cardStyle} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.1)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#1a1a1a';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '900',
              color: '#000000'
            }}>
              V
            </div>
            
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Verifier
            </h3>
            
            <p style={{
              color: '#888888',
              fontSize: '0.95rem',
              lineHeight: '1.7',
              marginBottom: '2rem',
              minHeight: '60px'
            }}>
              Verify proofs without learning the secret
            </p>
            
            <div style={{
              padding: '1rem 2rem',
              background: '#ffffff',
              color: '#000000',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>
              Verify →
            </div>
          </Link>

          {/* Blockchain Card */}
          <Link to="/blockchain" style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
            border: '2px solid #333'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = '#666666';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.15)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '900',
              color: '#000000'
            }}>
              B
            </div>
            
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Blockchain
            </h3>
            
            <p style={{
              color: '#888888',
              fontSize: '0.95rem',
              lineHeight: '1.7',
              marginBottom: '2rem',
              minHeight: '60px'
            }}>
              On-chain verification with smart contracts
            </p>
            
            <div style={{
              padding: '1rem 2rem',
              background: '#ffffff',
              color: '#000000',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>
              Deploy →
            </div>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          padding: '2rem 0',
          marginBottom: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: '#0a0a0a',
            borderRadius: '1rem',
            border: '1px solid #1a1a1a'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>●</div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>Privacy First</h4>
            <p style={{
              color: '#666666',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              margin: 0
            }}>Secrets never revealed</p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: '#0a0a0a',
            borderRadius: '1rem',
            border: '1px solid #1a1a1a'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>●</div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>Groth16</h4>
            <p style={{
              color: '#666666',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              margin: 0
            }}>Industry standard protocol</p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: '#0a0a0a',
            borderRadius: '1rem',
            border: '1px solid #1a1a1a'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>●</div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>Decentralized</h4>
            <p style={{
              color: '#666666',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              margin: 0
            }}>Blockchain verified</p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '3rem 0 2rem',
          borderTop: '1px solid #1a1a1a',
          marginTop: '3rem'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #ffffff, #888888, #ffffff)',
            height: '1px',
            width: '100px',
            margin: '0 auto 2rem',
            opacity: 0.2
          }}></div>
          
          <p style={{
            color: '#666666',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Powered by Circom • SnarkJS • Solidity
          </p>
          
          <p style={{
            color: '#444444',
            fontSize: '0.7rem',
            letterSpacing: '1px',
            margin: 0
          }}>
            Cryptographic Excellence
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;

