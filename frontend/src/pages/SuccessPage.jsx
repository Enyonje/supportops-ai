import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger celebration confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#3b82f6', '#ffffff']
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '50%', border: '2px solid #22c55e' }}>
            <CheckCircle size={48} color="#22c55e" />
          </div>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.02em' }}>Upgrade Successful!</h1>
        <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px' }}>
          Welcome to <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>SupportOps Pro</span>. Your AI accuracy and ticket orchestration limits have been lifted.
        </p>

        <button 
          onClick={() => navigate('/')}
          style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}
        >
          Go to Pro Dashboard <ArrowRight size={18} />
        </button>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.5 }}>
          <Zap size={14} fill="#3b82f6" color="#3b82f6" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pro Member Active</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;