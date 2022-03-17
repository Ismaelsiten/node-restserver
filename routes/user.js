const { Router} = require('express');
const { check } = require('express-validator');

const  {userGet ,userPut,userPost,userDelete} = require('../controllers/user');
const { esRolValido, existeEmail,existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/',  userGet );

  router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El el password debe de ser mas de 6 letras ').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
  ],userPost );
  router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
  ], userPut);
  router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

  ], userDelete);









module.exports=router;