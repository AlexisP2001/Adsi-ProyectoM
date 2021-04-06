import {Router} from 'express';
import categoriasControllers from '../controllers/categoria.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categoria.js';

const router = Router();

router.get('/',categoriasControllers.categoriaGet);
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaGetById);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos],categoriasControllers.categoriaPost);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos],categoriasControllers.categoriaPut);

router.put('/activar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaPutActivar);

router.put('/desactivar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    
    validarCampos],categoriasControllers.categoriaPutDesactivar);

router.delete('/:id',[check('id','No es un id valido').isMongoId(),
check('id').custom(existeCategoriaById),
    validarCampos],categoriasControllers.categoriaDelete);

export default router;