import {Router} from 'express';
import { validarCampos } from '../middlewares/validar-campos.js';
import {check} from 'express-validator'
import personaController from '../controllers/persona.js';

const router= Router();
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos],personaController.personaPost);

export default router