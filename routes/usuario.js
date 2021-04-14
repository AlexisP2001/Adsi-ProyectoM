import {Router} from 'express'
import { validarCampos } from '../middlewares/validar-campos.js';
import {check} from 'express-validator';
import usuarioController from '../controllers/usuario.js'
import {existeUsuarioById,existeEmail} from '../helpers/usuarios.js'

const router=Router();

router.get('/',[
    validarCampos],usuarioController.usuarioGet);
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos],usuarioController.usuarioGetById);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    validarCampos],usuarioController.usuarioPost);
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('email').custom(existeEmail),
    validarCampos],usuarioController.usuarioPut);
router.put('/activar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos],usuarioController.usuarioPutActivar);
router.put('/desactivar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos],usuarioController.usuarioPutDesactivar);
router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos],usuarioController.usuarioDelete)
router.post('/login',usuarioController.login)

export default router;