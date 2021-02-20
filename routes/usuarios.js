//* IMPORTS
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
    esRoleValido,
    emailExiste,
    existeUsuarioId
} = require('../helpers/db-validators');

const {
    validarCampos,
    esAdminRol,
    tieneRole,
    validarJWT,
    validarObjectId,
} = require('../middlewares');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../controllers/usuarios');






//* ROUTES
router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('correo').custom( (correo) => emailExiste(correo) ),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // validación personalizada
    // check('rol').custom( ( rol ) => esRoleValido(rol) ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.put('/:id', [
    validarObjectId,
    // check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usuariosDelete );





module.exports = router;

