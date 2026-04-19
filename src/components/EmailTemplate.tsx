import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{
    fontFamily: 'Inter, sans-serif',
    color: '#000',
    backgroundColor: '#fff',
    padding: '40px',
    border: '4px solid #000',
    maxWidth: '600px'
  }}>
    <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '900', 
        textTransform: 'uppercase', 
        letterSpacing: '-0.05em',
        borderBottom: '4px solid #000',
        paddingBottom: '20px',
        marginBottom: '40px'
    }}>
      System_Access_Inbound
    </h1>
    
    <div style={{ marginBottom: '30px' }}>
      <p style={{ margin: '0 0 5px 0', fontSize: '10px', fontWeight: '900', color: '#FF3000', textTransform: 'uppercase' }}>Identity</p>
      <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{name}</p>
    </div>

    <div style={{ marginBottom: '30px' }}>
        <p style={{ margin: '0 0 5px 0', fontSize: '10px', fontWeight: '900', color: '#FF3000', textTransform: 'uppercase' }}>Channel</p>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{email}</p>
    </div>

    <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#F5F5F5', borderLeft: '4px solid #FF3000' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '10px', fontWeight: '900', color: '#FF3000', textTransform: 'uppercase' }}>Transmission_Content</p>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>

    <div style={{ borderTop: '2px solid #EEE', paddingTop: '20px', fontSize: '10px', color: '#999', fontWeight: '700', textTransform: 'uppercase' }}>
      Direct_Log_Entry // Portfolio_System_v4.2
    </div>
  </div>
);
