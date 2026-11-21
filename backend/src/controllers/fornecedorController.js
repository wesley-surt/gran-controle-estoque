import { Fornecedor, Produto } from '../models/Associacoes.js';

// Criar Fornecedor
export const criarFornecedor = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.create(req.body);
    res.status(201).json(fornecedor);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar Fornecedores (com os produtos que cada um fornece)
export const listarFornecedores = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll({ include: Produto });
    res.json(fornecedores);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar Fornecedor
export const atualizarFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const fornecedor = await Fornecedor.findByPk(id);

    if (!fornecedor) {
      return res.status(404).json({ erro: 'Fornecedor não encontrado' });
    }

    await fornecedor.update(req.body);
    res.json(fornecedor);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar Fornecedor
export const deletarFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const fornecedor = await Fornecedor.findByPk(id);

    if (!fornecedor) {
      return res.status(404).json({ erro: 'Fornecedor não encontrado' });
    }

    await fornecedor.destroy();
    res.json({ mensagem: 'Fornecedor deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};