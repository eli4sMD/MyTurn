const { verDetalles, turnosadmin, cargarEspecialidad, obtenerEspecialidades, eliminar, pacientes } = require('../controllers/admin.controllers');
const validarJWT = require('../middleware/validarJWT');

const router = require('express').Router();

router.get('/verdetalles/:id', validarJWT, verDetalles);

router.get('/obtenerespecialidades', validarJWT, obtenerEspecialidades);


router.post('/pacientes', validarJWT, pacientes);

router.post('/turnosadmin', validarJWT, turnosadmin)

router.post('/cargarespecialidad',validarJWT, cargarEspecialidad);

router.delete('/eliminarespecialidad/:id', validarJWT, eliminar)

module.exports = router;