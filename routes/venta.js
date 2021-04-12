import {Router} from 'express'
import ventasController from '../controllers/venta.js'

const router = Router();
router.post('/',ventasController.ventaPost)
router.get('/',ventasController.ventaGet)
router.get('/:id',ventasController.ventaGetById)
router.put('/activar/:id',ventasController.ventaPutActivar)
router.put('/desactivar/:id',ventasController.ventaPutDesactivar)

export default router
