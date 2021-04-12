import{Router} from "express"
import articuloControllers from "../controllers/articulo.js";
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js' 
import { existeArticuloById, existeArticuloByCodigo, validarPrecio, validarStock } from '../helpers/articulo.js';
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    validarCampos],articuloControllers.articuloGet)
router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articulosGetById)
router.post('/',[validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('precioventa').custom(validarPrecio),
    check('stock').custom(validarStock),
    check('codigo','El codigo es obligatorio').not().isEmpty(),
    check('codigo').custom(existeArticuloByCodigo),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    validarCampos],articuloControllers.articulosPost)
router.put('/:id',[validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('precioventa').custom(validarPrecio),
    check('stock').custom(validarStock),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    check('codigo').custom(existeArticuloByCodigo),
    validarCampos],articuloControllers.articuloPut);
router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articuloPutActivar);
    
router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),        
    validarCampos],articuloControllers.articuloPutDesactivar);
    
router.delete('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articuloDelete);

export default router