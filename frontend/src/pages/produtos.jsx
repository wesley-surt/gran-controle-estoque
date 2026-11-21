import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  
  const [nomeProduto, setNomeProduto] = useState('');
  const [codigoBarra, setCodigoBarra] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  
  const [painelFornecedoresAberto, setPainelFornecedoresAberto] = useState({});
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resProdutos = await api.get('/produtos');
        const resFornecedores = await api.get('/fornecedores');
        setProdutos(resProdutos);
        setFornecedores(resFornecedores);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', {
        nomeProduto,
        codigoBarra: codigoBarra || null,
        descricao,
        quantidadeEstoque: Number(quantidadeEstoque),
        categoria,
        dataValidade: dataValidade || null
      });
      alert('Produto cadastrado com sucesso!');
      
      const resProdutos = await api.get('/produtos');
      setProdutos(resProdutos);

      setNomeProduto('');
      setCodigoBarra('');
      setDescricao('');
      setQuantidadeEstoque(0);
      setCategoria('');
      setDataValidade('');
    } catch (error) {
      alert('Erro ao cadastrar produto: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente deletar este produto?')) {
      try {
        await api.delete(`/produtos/${id}`);
        const resProdutos = await api.get('/produtos');
        setProdutos(resProdutos);
      } catch (error) {
        alert('Erro ao deletar: ' + error.message);
      }
    }
  };

  const togglePainelFornecedores = (produtoId) => {
    setPainelFornecedoresAberto(prev => ({
      ...prev,
      [produtoId]: !prev[produtoId]
    }));
  };

  const handleVincular = async (produtoId) => {
    const fornecedorId = fornecedorSelecionado[produtoId];
    if (!fornecedorId) return alert('Selecione um fornecedor na lista.');
    
    try {
      await api.post(`/produtos/${produtoId}/fornecedores/${fornecedorId}`, {});
      alert('Fornecedor associado com sucesso!');
      const resProdutos = await api.get('/produtos');
      setProdutos(resProdutos);
    } catch (error) {
      alert('Erro ao associar: ' + error.message);
    }
  };

  const handleDesvincular = async (produtoId, fornecedorId) => {
    if (confirm('Deseja remover este fornecedor do produto?')) {
      try {
        await api.delete(`/produtos/${produtoId}/fornecedores/${fornecedorId}`);
        alert('Associação removida com sucesso!');
        const resProdutos = await api.get('/produtos');
        setProdutos(resProdutos);
      } catch (error) {
        alert('Erro ao desassociar: ' + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', margin: '0 auto' }}>
      <h2>Gerenciamento de Produtos</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', marginBottom: '25px', borderRadius: '6px', border: '1px solid #ddd' }}>
        <h3>Novo Produto</h3>
        <input type="text" placeholder="Nome do Produto *" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="Código de Barras" value={codigoBarra} onChange={e => setCodigoBarra(e.target.value)} style={inputStyle} /><br/>
        <textarea placeholder="Descrição *" value={descricao} onChange={e => setDescricao(e.target.value)} required style={inputStyle} /><br/>
        <input type="number" placeholder="Quantidade em Estoque *" value={quantidadeEstoque} onChange={e => setQuantidadeEstoque(e.target.value)} required style={inputStyle} /><br/>
        <input type="text" placeholder="Categoria *" value={categoria} onChange={e => setCategoria(e.target.value)} required style={inputStyle} /><br/>
        <label style={{ fontSize: '14px', color: '#555' }}>Data de Validade (opcional): </label><br/>
        <input type="date" value={dataValidade} onChange={e => setDataValidade(e.target.value)} style={inputStyle} /><br/>
        <button type="submit" style={btnGreen}>Cadastrar Produto</button>
      </form>

      <h3>Produtos Cadastrados</h3>
      {produtos.length === 0 && <p>Nenhum produto cadastrado até o momento.</p>}
      
      {produtos.map(prod => {
        const isOpen = painelFornecedoresAberto[prod.id];
        
        return (
          <div key={prod.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '6px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{prod.nomeProduto} <span style={{ fontSize: '0.8em', color: '#666', fontWeight: 'normal' }}>({prod.categoria})</span></h4>
                <p style={{ margin: '3px 0' }}><strong>Descrição:</strong> {prod.descricao}</p>
                <p style={{ margin: '3px 0' }}><strong>Estoque:</strong> {prod.quantidadeEstoque} | <strong>Cód. Barras:</strong> {prod.codigoBarra || 'N/A'}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => togglePainelFornecedores(prod.id)} style={btnPurple}>
                  Fornecedores {prod.Fornecedores?.length > 0 ? `(${prod.Fornecedores.length})` : '(0)'}
                </button>
                <button onClick={() => handleDelete(prod.id)} style={btnRed}>Deletar</button>
              </div>
            </div>

            {isOpen && (
              <div style={{ marginTop: '15px', background: '#f1f3f5', padding: '12px', borderRadius: '5px', border: '1px solid #dcdcdc' }}>
                <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Fornecedores vinculados a este produto:</h5>
                
                {prod.Fornecedores && prod.Fornecedores.length > 0 ? (
                  <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                    {prod.Fornecedores.map(f => (
                      <li key={f.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '500px' }}>
                        <span><strong>{f.nomeEmpresa}</strong> (CNPJ: {f.cnpj})</span>
                        <button onClick={() => handleDesvincular(prod.id, f.id)} style={btnSmallOrange}>Remover</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontStyle: 'italic', color: '#666', fontSize: '13px', margin: '0 0 10px 0' }}>Nenhum fornecedor vinculado a este produto.</p>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                  <select 
                    onChange={e => setFornecedorSelecionado(prev => ({ ...prev, [prod.id]: e.target.value }))} 
                    defaultValue="" 
                    style={{ padding: '6px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="" disabled>Selecione um fornecedor para adicionar...</option>
                    {fornecedores.map(f => (
                      <option key={f.id} value={f.id}>{f.nomeEmpresa} - {f.cnpj}</option>
                    ))}
                  </select>
                  <button onClick={() => handleVincular(prod.id)} style={btnBlue}>Adicionar</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' };
const btnGreen = { background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' };
const btnBlue = { background: '#007bff', color: '#fff', border: 'none', padding: '7px 12px', cursor: 'pointer', borderRadius: '4px' };
const btnPurple = { background: '#6f42c1', color: '#fff', border: 'none', padding: '7px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' };
const btnRed = { background: '#dc3545', color: '#fff', border: 'none', padding: '7px 12px', cursor: 'pointer', borderRadius: '4px' };
const btnSmallOrange = { background: '#e0a800', color: '#fff', border: 'none', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '3px', fontWeight: 'bold' };