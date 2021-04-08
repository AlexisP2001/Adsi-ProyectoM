import {Router} from 'express';
import categoriasControllers from '../controllers/categoria.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categoria.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRoles } from '../middlewares/validar-rol.js';

const router = Router();

router.get('/',[validarJWT,validarRoles('ALMACENISTA_ROL')],categoriasControllers.categoriaGet);
router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaGetById);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos],categoriasControllers.categoriaPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos],categoriasControllers.categoriaPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    
    validarCampos],categoriasControllers.categoriaPutDesactivar);

router.delete('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaDelete);

export default router;