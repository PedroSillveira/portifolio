import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{
      background: 'var(--black-color)',
      color: 'var(--white-color)',
      textAlign: 'center',
      padding: '2rem 0',
      borderTop: '1px solid var(--gray-800)'
    }}>
      <Container>
        <p style={{ margin: 0, color: 'var(--white-color)' }}>
          © 2025 - Todos os direitos reservados
        </p>
      </Container>
    </footer>
  );
}

export default Footer;