import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fornecedor = sequelize.define('Fornecedores', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeEmpresa: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }},
  cnpj: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true }},
  endereco: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }},
  telefone: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }},
  email: {type: DataTypes.STRING, allowNull: false, validate: { isEmail: true, notEmpty: true }},
  contatoPrincipal: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }}
});

export default Fornecedor;