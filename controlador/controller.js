const controller = {};

controller.inicio = (req, res) => {
    res.render('login');
}

controller.listvendedor = (req, res) => {
    const user = req.session.name;
    
    if (req.session.loggedin1){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuarios INNER JOIN datos on (usuarios.UsuId = datos.UsuId) INNER JOIN vehiculos on (datos.DatId = vehiculos.DatId) INNER JOIN categorias on (vehiculos.CatId = categorias.CatId) WHERE UsuLogin = ?', [user], (err, results) => {
                conn.query('SELECT * FROM categorias', (err, cats) => {
                    conn.query('SELECT * FROM datos INNER JOIN usuarios on (datos.UsuId = usuarios.UsuId) WHERE UsuLogin = ?', [user], (err, dat) => {
                        if (req.session.switch){
                            res.render('vehiculos', {
                                dat: dat,
                                data: results,
                                name: req.session.name,
                                cambio: true,
                                cat: cats,
                                login: true
                            })
                        } else {
                            res.render('vehiculos', {
                                dat: dat,
                                data: results,
                                name: req.session.name,
                                cambio: false,
                                cat: cats,
                                login: true
                            })
                        }
                    })
                })
            })
        })
    } else {
        res.render('vehiculos', {
            name: "Debe iniciar sesion como vendedor",
            login: false
        })
    }
}

controller.savevehiculo = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO vehiculos SET ?', [data], (err, results) => {
            if (err) {
                res.send("¡Error, has introducido un dato duplicado o inválido");
            } else {
                res.redirect("/vehiculos");
            }
        })
    })
}

controller.catvehiculo = (req, res) => {
    const data = req.body;

    if (req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM vehiculos INNER JOIN categorias on (vehiculos.CatId = categorias.CatId) WHERE vehiculos.CatId = ?', [data.CatId], (err, results) => {
                conn.query('SELECT * FROM categorias', (err, cat) => {
                    if (err) {
                        res.json(err);
                    } else {
                        if (req.session.switch) {
                            res.render('vehcat', {
                                cat: cat,
                                data: results,
                                name: req.session.name,
                                cambio: true,
                                logincli: true
                            })
                        } else {
                            res.render('vehcat', {
                                cat: cat,
                                data: results,
                                name: req.session.name,
                                cambio: false,
                                logincli: true
                            })
                        }
                    }
                })
            })
        })
    } else {
        res.render('vehcat', {
            name: "Debe iniciar sesion como comprador",
            logincli: false
        })
    }
}

controller.vendedordata = (req, res) => {
    const { id } = req.params;

    if (req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM datos INNER JOIN usuarios on (datos.UsuId = usuarios.UsuId) WHERE DatId = ?', [id], (err, results) => {
                if (err) {
                    res.send('Los datos no pudieron ser encontrados.')
                } else {
                    if (req.session.switch){
                        res.render('vendata', {
                            data: results,
                            name: req.session.name,
                            logincli: true,
                            cambio: true,
                        })
                    } else {
                        res.render('vendata', {
                            data: results,
                            name: req.session.name,
                            logincli: true,
                            cambio: false,
                        })
                    }
                }
            })
        })
    } else {
        res.render('vendata', {
            name: "Debe iniciar sesion como comprador",
            logincli: false
        })
    }
}

controller.prevehiculo = (req, res) => {
    const data = req.body;

    if (req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM vehiculos INNER JOIN datos on (vehiculos.DatId = datos.DatId) WHERE VehPrecio BETWEEN ? AND ?', [data.PrecioMin, data.PrecioMax], (err, results) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(results);
                    if (req.session.switch) {
                        res.render('vehpre', {
                            data: results,
                            name: req.session.name,
                            cambio: true,
                            logincli: true
                        })
                    } else {
                        res.render('vehpre', {
                            data: results,
                            name: req.session.name,
                            cambio: false,
                            logincli: true
                        })
                    }
                }
            })
        })
    } else {
        res.render('vehpre', {
            name: "Debe iniciar sesion como comprador",
            logincli: false
        })
    }
}

controller.vehiculo1 = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM categorias', (err, results) => {
                if (req.session.switch){
                    res.render('vehiculos1', {
                        cat: results,
                        name: req.session.name,
                        cambio: true,
                        logincli: true
                    })
                } else {
                    res.render('vehiculos1', {
                        cat: results,
                        name: req.session.name,
                        cambio: false,
                        logincli: true
                    })
                }
            })
        })
    } else {
        res.render('vehiculos1', {
            name: "Debe iniciar sesion como comprador",
            logincli: false
        })
    }
}

controller.vehiculo2 = (req, res) => {
    if(req.session.loggedin){
        if (req.session.switch){
            res.render('vehiculos2', {
                name: req.session.name,
                cambio: true,
                logincli: true
            })
        } else {
            res.render('vehiculos2', {
                name: req.session.name,
                cambio: false,
                logincli: true
            })
        }
    } else {
        res.render('vehiculos2', {
            name: "Debe iniciar sesion como comprador",
            logincli: false
        })
    }
}

controller.usuarios = (req, res) => {
    const { rol } = req.params;
    res.render('usuarios', {
        rol: rol
    })
}

controller.registrousu = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE UsuLogin = ?', [data.UsuLogin], (err, usu) => {
            if (usu.length >= 2){
                res.render('usuarios', {
                    rol: data.RolId,
                    alert: true,
                    alertTitle: "¡Registro Fallido!",
                    alertMessage: "No puede crear más usuarios",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: `usuarios/${data.RolId}`
                });
            } else {
                if (usu.length > 0) {
                    if (data.RolId != usu[0].RolId) {
                        conn.query('INSERT INTO usuarios SET ?', [data], (err, results) => {
                            conn.query('SELECT * FROM usuarios WHERE UsuLogin = ?', [data.UsuLogin], (err, logs) => {
                                if (err) {
                                    res.send("¡Error, el dato introducido no se ha introducido correctamente");
                                } else {
                                    if (logs.length > 1){
                                        conn.query('SELECT DatNombre, DatApellido, DaTipoId, DatNumeroId, DaTelefono, DatCorreo FROM datos INNER JOIN usuarios on (datos.UsuId = usuarios.UsuId) WHERE UsuLogin = ?', [data.UsuLogin], (err, datos) => {
                                            conn.query('INSERT INTO datos SET ?', {UsuId: logs[1].UsuId, DatNombre: datos[0].DatNombre, DatApellido: datos[0].DatApellido, DaTipoId: datos[0].DaTipoId, DatNumeroId: datos[0].DatNumeroId, DaTelefono: datos[0].DaTelefono, DatCorreo: datos[0].DatCorreo}, (err, insert) => {
                                                res.render('usuarios', {
                                                    rol: data.RolId,
                                                    alert: true,
                                                    alertTitle: "¡Registro Completado!",
                                                    alertMessage: "Sus datos han sido registrados correctamente",
                                                    alertIcon: "success",
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                    ruta: ''
                                                });
                                            })
                                        })
                                    }
                                }
                            })
                        })
                    } else {
                        res.render('usuarios', {
                            rol: data.RolId,
                            alert: true,
                            alertTitle: "¡Registro Fallido!",
                            alertMessage: "No puede crear dos usuarios con el mismo rol",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: `usuarios/${data.RolId}`
                        });
                    }   
                } else {
                    conn.query('INSERT INTO usuarios SET ?', [data], (err, results) => {
                        conn.query('SELECT * FROM usuarios WHERE UsuLogin = ?', [data.UsuLogin], (err, logs) => {
                            if (err) {
                                res.send("¡Error, el dato introducido no se ha introducido correctamente");
                            } else {
                                res.redirect(`/datos/${logs[0].UsuId}`);
                            }
                        })
                    })
                }
            }
        })
    })
}

controller.datos = (req, res) => {
    const { id } = req.params;
    res.render('datos', {
        id: id
    })
}

controller.registrodat = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO datos SET ?', [data], (err, results) => {
            if(err) {
                res.render('datos', {
                    id: data.UsuId,
                    alert: true,
                    alertTitle: "¡Registro Fallido!",
                    alertMessage: "Sus datos no han sido registrados",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: `datos/${data.UsuId}`
                });
            } else {
                res.render('datos', {
                    id: data.UsuId,
                    alert: true,
                    alertTitle: "¡Registro Completado!",
                    alertMessage: "Sus datos han sido registrados correctamente",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        })
    })
}

controller.ingreso = (req, res) => {
    const user = req.body.UsuLogin;
    const pass = req.body.UsuPass;
    const rol = ['Vendedor', 'Comprador']

    req.getConnection((err, conn) => {
        
        if(user && pass){
            conn.query('SELECT UsuId, UsuLogin, UsuPass, RolTipo FROM usuarios INNER JOIN rol on (usuarios.RolId = rol.RolId) WHERE UsuLogin = ?', [user], (err, results) => {
                if(results.length == 0 || pass != results[0].UsuPass){
                    res.render('login',{
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Datos incorrectos",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
                    });
                }
                else{
                    if(results.length > 1){
                        req.session.switch = true;
                        req.session.name = results[0].UsuLogin;
                        req.session.id = results[0].UsuId;

                        if(results[0].RolTipo == rol[0]){
                            req.session.loggedin1 = true;
                            res.render('login', {
                                alert: true,
                                alertTitle: "¡Conexión exitosa!",
                                alertMessage: "Bienvenido/a",
                                alertIcon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'vehiculos'
                            })
                        } else {
                            req.session.loggedin = true;
                            res.render('login', {
                                alert: true,
                                alertTitle: "¡Conexión exitosa!",
                                alertMessage: "Bienvenido/a",
                                alertIcon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'vehiculos1'
                            })
                        }

                    } else if(results[0].RolTipo == rol[0]){
                        req.session.switch = false;
                        req.session.loggedin1 = true;
                        req.session.name = results[0].UsuLogin;
                        req.session.id = results[0].UsuId;
                        res.render('login',{
                            alert: true,
                            alertTitle: "¡Conexión exitosa!",
                            alertMessage: "Bienvenido/a",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'vehiculos'
                        });
                    } else if(results[0].RolTipo == rol[1]){
                        req.session.switch = false;
                        req.session.loggedin = true;
                        req.session.name = results[0].UsuLogin;
                        req.session.id = results[0].UsuId;
                        res.render('login',{
                            alert: true,
                            alertTitle: "¡Conexión exitosa!",
                            alertMessage: "Bienvenido/a",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'vehiculos1'
                        });
                    }
                }
            })
        }
        else{
            res.render('login',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese o vuelva a ingresar sus datos",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'login'
            });
        }
    })
}

controller.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

controller.personal = (req, res) => {
    const user = req.session.name;

    if (req.session.loggedin || req.session.loggedin1) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM datos INNER JOIN usuarios on (datos.UsuId = usuarios.UsuId) WHERE UsuLogin = ?', [user], (err, personal) => {
                if (err){
                    res.json(err);
                } else {
                    if (req.session.loggedin) {
                        if (req.session.switch) {
                            res.render('personal', {
                                data: personal,
                                login: true,
                                logincli: false,
                                cambio: true,
                                name: user
                            })
                        } else {
                            res.render('personal', {
                                data: personal,
                                login: true,
                                logincli: false,
                                cambio: false,
                                name: user
                            })
                        }
                    } else if (req.session.loggedin1) {
                        if (req.session.switch) {
                            res.render('personal', {
                                data: personal,
                                login: false,
                                logincli: true,
                                cambio: true,
                                name: user
                            })
                        } else {
                            res.render('personal', {
                                data: personal,
                                login: false,
                                logincli: true,
                                cambio: false,
                                name: user
                            })
                        }
                    }
                }
            })
        })
    } else {
        res.render('personal', {
            login: false,
            loginad: false,
            logincli: false,
            name: 'Debe iniciar sesión'
        })
    }
}

controller.updatepersonal = async (req, res) => {
    const data = req.body;
    const user = req.session.name;

    req.getConnection((err, conn) => {
        conn.query('UPDATE datos INNER JOIN usuarios on (datos.UsuId = usuarios.UsuId) SET ? WHERE usuarios.UsuLogin = ?', [data, user], (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/personal')
            }
        })
    })
}

controller.actvehiculo = (req, res) => {
    const data = req.body

    req.getConnection((err, conn) => {
        conn.query('UPDATE vehiculos SET ? WHERE VehPlaca = ?', [data, data.VehPlaca], (err, results) => {
            if (err) {
                res.send("¡Error, has introducido un dato duplicado o inválido");
            } else {
                res.redirect('/vehiculos')
            }
        })
    })
}

controller.borvehiculo = (req, res) => {
    const data = req.body

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM vehiculos WHERE VehPlaca = ?', [data.VehPlaca], (err, results) => {
            if (err) {
                res.send("¡Error, no se ha podido eliminar el dato!");
            } else {
                res.redirect('/vehiculos')
            }
        })
    })
}

controller.cambio = (req, res) => {
    const { id } = req.params;

    if (id == 1){
        req.session.loggedin = true;
        req.session.loggedin1 = false;
        res.redirect("/vehiculos1");
    } else {
        req.session.loggedin = false;
        req.session.loggedin1 = true;
        res.redirect("/vehiculos");
    }
}

module.exports = controller;