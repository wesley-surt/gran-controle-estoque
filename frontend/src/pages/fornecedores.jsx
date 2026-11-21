import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [contatoPrincipal, setContatoPrincipal] = useState('');

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const res = await api.get('/fornecedores');
        setFornecedores(res);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      }
    };
    carregarFornecedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fornecedores', {
        nomeEmpresa,
        cnpj,
        endereco,
        telefone,
        email,
        contatoPrincipal
      });
      alert('Fornecedor cadastrado com sucesso!');
      
      const res = await api.get('/fornecedores');
      setFornecedores(res);

      setNomeEmpresa('');
      setCnpj('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setContatoPrincipal('');
    } catch (error) {
      alert('Erro ao cadastrar fornecedor: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente deletar este fornecedor?')) {
      try {
        await api.delete(`/fornecedores/${id}`);
        const res = await api.get('/fornecedores');
        setFornecedores(res);
      } catch (error) {
        alert('Erro ao deletar fornecedor: ' + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', margin: '0 auto' }}>
      <h2>Gerenciamento de Fornecedores</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', marginBottom: '25px', borderRadius: '6px', border: '1px solid #ddd' }}>
        <h3>Novo Fornecedor</h3>
        <input type="text" placeholder="Nome da Empresa *" value={nomeEmpresa} onChange={e => setNomeEmpresa(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="CNPJ *" value={cnpj} onChange={e => setCnpj(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="Endereço *" value={endereco} onChange={e => setEndereco(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="Telefone *" value={telefone} onChange={e => setTelefone(e.target.value)} required style={inputStyle} /><br/>
        <input type="email" placeholder="E-mail *" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="Contato Principal (Nome) *" value={contatoPrincipal} onChange={e => setContatoPrincipal(e.target.value)} required style={inputStyle} /><br/>
        
        <button type="submit" style={btnGreen}>Cadastrar Fornecedor</button>
      </form>

      <h3>Fornecedores Cadastrados</h3>
      {fornecedores.length === 0 && <p>Nenhum fornecedor cadastrado até o momento.</p>}
      
      {fornecedores.map(f => (
        <div key={f.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '6px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{f.nomeEmpresa} <span style={{ fontSize: '0.8em', color: '#666', fontWeight: 'normal' }}>(CNPJ: {f.cnpj})</span></h4>
              <p style={{ margin: '3px 0' }}><strong>Endereço:</strong> {f.endereco}</p>
              <p style={{ margin: '3px 0' }}><strong>Telefone:</strong> {f.telefone} | <strong>E-mail:</strong> {f.email}</p>
              <p style={{ margin: '3px 0' }}><strong>Contato Principal:</strong> {f.contatoPrincipal}</p>
            </div>
            
            <div>
              <button onClick={() => handleDelete(f.id)} style={btnRed}>Deletar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' };
const btnGreen = { background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' };
const btnRed = { background: '#dc3545', color: '#fff', border: 'none', padding: '7px 12px', cursor: 'pointer', borderRadius: '4px' };