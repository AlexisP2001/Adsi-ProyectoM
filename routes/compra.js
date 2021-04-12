import {Router} from 'express'
import comprasController from '../controllers/compra.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeSerieComprobante, validarImpuesto, validarTotal,personaProveedor} from '../helpers/compra.js';



const router=Router();

router.post('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('persona').custom(personaProveedor),
    check('tipoComprobante','El tipo de comprobante es obligatorio').not().isEmpty(),
    check('serieComprobante').custom(existeSerieComprobante),
    check('serieComprobante','El número de serie del comprobante es obligatorio').not().isEmpty(),
    check('numComprobante','El número de comprobante es obligatorio').not().isEmpty(),
    check('impuesto').custom(validarImpuesto),
    check('total').custom(validarTotal),
    validarCampos],comprasController.compraPost)

router.get('/',comprasController.compraGet)
router.get('/:id',comprasController.compraGetById)
router.put('/activar/:id',comprasController.compraPutActivar)
router.put('/desactivar/:id',comprasController.compraPutDesactivar)

export default router