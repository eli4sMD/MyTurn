
const { solicitarTurno, misTurnos, turnos, cancelarTurno, editarDatos, misDatos, cambiarPass } = require('../controllers/user.controllers');
const validarJWT = require('../middleware/validarJWT');

const router = require('express').Router();

router.post('/solicitarturno', validarJWT, solicitarTurno);

router.get('/misturnos', validarJWT, misTurnos);

router.get('/turnos', turnos);

router.delete('/cancelarturno/:id', validarJWT, cancelarTurno);

router.get('/misdatos', validarJWT, misDatos);

router.put('/editar', validarJWT, editarDatos);

router.put('/editarpass', validarJWT, cambiarPass);


module.exports = router;