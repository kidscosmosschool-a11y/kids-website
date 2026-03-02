import React from 'react';

function WhatsAppButton() {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
      <a
        href="https://wa.me/9860667648"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '28px',
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default WhatsAppButton;