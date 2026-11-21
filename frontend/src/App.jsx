import { useState } from 'react';
import Produtos from './pages/produtos.jsx';
import Fornecedores from './pages/fornecedores.jsx';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('produtos');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Painel de Controle - Estoque</h1>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setAbaAtiva('produtos')} 
          style={{ padding: '10px 20px', background: abaAtiva === 'produtos' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Produtos
        </button>
        <button 
          onClick={() => setAbaAtiva('fornecedores')} 
          style={{ padding: '10px 20px', background: abaAtiva === 'fornecedores' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Fornecedores
        </button>
      </nav>

      <hr style={{ border: '1px solid #ddd', marginBottom: '20px' }} />

      {abaAtiva === 'produtos' ? <Produtos /> : <Fornecedores />}
    </div>
  );
}