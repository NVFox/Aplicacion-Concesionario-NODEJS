const express = require('express');
const router = express.Router();

const control = require('../controlador/controller')

router.get('/', control.inicio);
router.get('/vehiculos', control.listvendedor);
router.post('/add', control.savevehiculo);
router.post('/auth', control.ingreso);
router.get('/logout', control.logout);
router.get('/personal', control.personal);
router.post('/uppersonal', control.updatepersonal);
router.get('/switch/:id', control.cambio);
router.get('/usuarios/:rol', control.usuarios);
router.post('/registrousu', control.registrousu);
router.get('/datos/:id', control.datos);
router.post('/registrodat', control.registrodat);
router.get('/vehiculos1', control.vehiculo1);
router.get('/vehiculos2', control.vehiculo2);
router.post('/vehcat', control.catvehiculo);
router.post('/vehpre', control.prevehiculo);
router.get('/vendedor/:id', control.vendedordata);
router.post('/update', control.actvehiculo);
router.post('/delete', control.borvehiculo);

module.exports = router;