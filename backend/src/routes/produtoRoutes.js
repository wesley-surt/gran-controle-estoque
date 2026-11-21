import { Router } from 'express';
import { 
  criarProduto, 
  listarProdutos, 
  atualizarProduto, 
  deletarProduto,
  associarFornecedor,
  desassociarFornecedor
} from '../controllers/produtoController.js';


const router = Router();

router.post('/produtos', criarProduto);
router.get('/produtos', listarProdutos);
router.put('/produtos/:id', atualizarProduto);
router.delete('/produtos/:id', deletarProduto);
router.post('/produtos/:produtoId/fornecedores/:fornecedorId', associarFornecedor);
router.delete('/produtos/:produtoId/fornecedores/:fornecedorId', desassociarFornecedor);

export default router;