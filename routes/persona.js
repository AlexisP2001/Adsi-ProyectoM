import {Router} from 'express';
import { validarCampos } from '../middlewares/validar-campos.js';
import {check} from 'express-validator';
import { validarRoles } from '../middlewares/validar-rol.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {existeEmail, existePersonaById, existePersonaNumDoc} from '../helpers/persona.js'
import personasControllers from '../controllers/persona.js';

const router= Router();
router.post('/',[    
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('tipoPersona','El tipo de persona es obligatorio').not().isEmpty(),
    check('tipoDocumento','El tipo de documento es obligatorio').not().isEmpty(),
    check('numDocumento','El número del documento es obligatorio').not().isEmpty(),
    check('email').custom(existeEmail),
    validarCampos],personasControllers.personaPost);
router.get('/',[    
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos],personasControllers.personaGet)
router.get('/listClientes',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos],personasControllers.personaGetListClientes)
router.get('/listProveedores',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos],personasControllers.personaGetListProveedores)
router.get('/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos],personasControllers.personaGetById)
router.put('/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existePersonaById),
    check('numDocumento').custom(existePersonaNumDoc),
    validarCampos],personasControllers.personaPut)
router.delete('/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos],personasControllers.personaDelete)
router.put('/activar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos],personasControllers.personaActivar)
router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos],personasControllers.personaDesactivar)

export default router