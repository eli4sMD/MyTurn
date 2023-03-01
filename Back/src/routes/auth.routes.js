const { register, login, validarPass } = require('../controllers/auth.controllers');
const validarJWT = require('../middleware/validarJWT');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validarpass',  validarJWT, validarPass);


module.exports = router;