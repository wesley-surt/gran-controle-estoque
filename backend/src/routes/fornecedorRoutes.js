import { Router } from 'express';
import { 
  criarFornecedor, 
  listarFornecedores, 
  atualizarFornecedor, 
  deletarFornecedor 
} from '../controllers/fornecedorController.js';

const router = Router();

router.post('/fornecedores', criarFornecedor);
router.get('/fornecedores', listarFornecedores);
router.put('/fornecedores/:id', atualizarFornecedor);
router.delete('/fornecedores/:id', deletarFornecedor);

export default router;