import {Router} from 'express'
import comprasController from '../controllers/compra.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeSerieComprobante, validarImpuesto, validarTotal,personaProveedor, existeCompraById, personaActiva} from '../helpers/compra.js';



const router=Router();

router.post('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('persona').custom(personaProveedor),
    check('estado').custom(personaActiva),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('persona','La persona es obligatoria').not().isEmpty(),
    check('tipoComprobante','El tipo de comprobante es obligatorio').not().isEmpty(),
    check('serieComprobante').custom(existeSerieComprobante),
    check('serieComprobante','El número de serie del comprobante es obligatorio').not().isEmpty(),
    check('numComprobante','El número de comprobante es obligatorio').not().isEmpty(),
    check('impuesto').custom(validarImpuesto),
    check('total').custom(validarTotal),
    validarCampos],comprasController.compraPost)

router.get('/',[  
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos],comprasController.compraGet)
router.get('/:id',[ 
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos],comprasController.compraGetById)
router.put('/activar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos],comprasController.compraPutActivar)
router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos],comprasController.compraPutDesactivar)

export default router