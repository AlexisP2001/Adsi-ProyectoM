import {Router} from 'express';
import { validarCampos } from '../middlewares/validar-campos.js';
import {check} from 'express-validator';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import personasControllers from '../controllers/persona.js';

const router= Router();
router.post('/',[    
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos],personasControllers.personaPost);
router.get('/',[validarCampos],personasControllers.personaGet)
router.get('/:tipoPersona',[validarCampos],personasControllers.personaGetListClientes)
router.get('/:tipoPersona',[validarCampos],personasControllers.personaGetListProveedores)
router.get('/:id',[validarCampos],personasControllers.personaGetById)
router.put('/:id',[validarCampos],personasControllers.personaPut)
router.delete('/:id',personasControllers.personaDelete)
router.put('/activar/:id',personasControllers.personaActivar)
router.put('/desactivar/:id',personasControllers.personaDesactivar)

export default router