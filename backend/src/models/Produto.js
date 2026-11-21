import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Produto = sequelize.define('Produtos', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeProduto: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  codigoBarra: { type: DataTypes.STRING, allowNull: true, unique: true },
  descricao: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
  quantidadeEstoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  categoria: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  dataValidade: { type: DataTypes.DATEONLY, allowNull: true },
  imagemProduto: { type: DataTypes.STRING, allowNull: true }
});

export default Produto;