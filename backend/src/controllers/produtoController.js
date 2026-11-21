import { Produto, Fornecedor } from '../models/Associacoes.js';

// Criar Produto
export const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar Produtos (com seus fornecedores)
export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({ include: Fornecedor });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar Produto
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await produto.update(req.body);
    res.json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar Produto
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Associar Fornecedor ao Produto
export const associarFornecedor = async (req, res) => {
  try {
    const { produtoId, fornecedorId } = req.params;

    const produto = await Produto.findByPk(produtoId);
    const fornecedor = await Fornecedor.findByPk(fornecedorId);

    if (!produto || !fornecedor) {
      return res.status(404).json({ erro: 'Produto ou Fornecedor não encontrado' });
    }

    await produto.addFornecedores(fornecedor);
    res.status(201).json({ mensagem: 'Fornecedor associado ao produto com sucesso!' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Remover Associação entre Fornecedor e Produto
export const desassociarFornecedor = async (req, res) => {
  try {
    const { produtoId, fornecedorId } = req.params;

    const produto = await Produto.findByPk(produtoId);
    const fornecedor = await Fornecedor.findByPk(fornecedorId);

    if (!produto || !fornecedor) {
      return res.status(404).json({ erro: 'Produto ou Fornecedor não encontrado' });
    }

    await produto.removeFornecedores(fornecedor);
    res.json({ mensagem: 'Associação removida com sucesso!' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};