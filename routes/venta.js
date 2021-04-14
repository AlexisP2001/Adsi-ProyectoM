import {Router} from 'express'
import { validarCampos } from '../middlewares/validar-campos.js';
import {check} from 'express-validator';
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import ventasController from '../controllers/venta.js'
import {validarDescuento,validarImpuesto,validarTotal,existeVentaById, personaCliente} from '../helpers/venta.js'

const router = Router();
router.post('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('persona').custom(personaCliente),
    check('tipoComprobante','El tipo de comprobante es obligatorio').not().isEmpty(),
    check('serieComprobante','El número de serie del comprobante es obligatorio').not().isEmpty(),
    check('numComprobante','El número de comprobante es obligatorio').not().isEmpty(),
    check('impuesto').custom(validarImpuesto),
    check('descuento').custom(validarDescuento),
    check('total').custom(validarTotal),
    validarCampos],ventasController.ventaPost)
router.get('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos],ventasController.ventaGet)
router.get('/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos],ventasController.ventaGetById)
router.put('/activar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos],ventasController.ventaPutActivar)
router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos],ventasController.ventaPutDesactivar)

export default router
