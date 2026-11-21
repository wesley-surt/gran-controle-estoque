import './models/Associacoes.js'; // Garante que os modelos e relações sejam carregados
import express from 'express';
import sequelize from './config/database.js';
import produtoRoutes from './routes/produtoRoutes.js';
import fornecedorRoutes from './routes/fornecedorRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Usando as rotas
app.use(produtoRoutes);
app.use(fornecedorRoutes);

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});