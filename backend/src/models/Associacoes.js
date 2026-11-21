import sequelize from '../config/database.js';
import Produto from './Produto.js';
import Fornecedor from './Fornecedor.js';

const ProdutoFornecedor = sequelize.define('ProdutoFornecedor', {});

Produto.belongsToMany(Fornecedor, { through: ProdutoFornecedor, foreignKey: 'produtoId' });
Fornecedor.belongsToMany(Produto, { through: ProdutoFornecedor, foreignKey: 'fornecedorId' });

export { Produto, Fornecedor, ProdutoFornecedor };