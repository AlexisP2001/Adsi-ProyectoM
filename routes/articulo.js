import{Router} from "express"
import articuloControllers from "../controllers/articulo.js";
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { existeArticuloById, existeArticuloByNombre } from '../helpers/articulo.js';
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
// import {validarNumeros} from '../middlewares/validar-numero.js'

const router=Router();

router.get('/',[
    validarJWT,
    validarCampos
],articuloControllers.articuloGet)
router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articulosGetById)
router.post('/',articuloControllers.articulosPost)
router.put('/:id',[
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    check('nombre').custom(existeArticuloByNombre),
    validarCampos],articuloControllers.articuloPut);
router.put('/activar/:id',[
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articuloPutActivar);
    
router.put('/desactivar/:id',[
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),        
    validarCampos],articuloControllers.articuloPutDesactivar);
    
router.delete('/:id',[
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos],articuloControllers.articuloDelete);

export default router