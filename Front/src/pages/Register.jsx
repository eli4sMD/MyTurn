import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        fechadenacimiento:'',
        direccion: '',
        correo: '',
        contraseña: ''
    });


    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }


    const register = async (e) => {
        e.preventDefault();

        const req = await fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const res = await req.json();

        if (!req.ok) {
            return alert(res.msg)
        }

        alert(res.msg)

        return navigate('/login')
    }



    return (
        <div className="container">
            <div id='register' className="row">
                <div className="col">
                    <div id='registerForm'>
                        <center>
                            <h1 className='fw-bold' style={{ color: '#1ee9b6' }}>Crea tu cuenta en MyTurn</h1>
                        </center>
                        <br />
                        <form onSubmit={register} className="row g-3">
                            <div className="col-6">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" onChange={handleChange} name='nombre' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" onChange={handleChange} name='apellido' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">DNI</label>
                                <input type="number" className="form-control" onChange={handleChange} name='dni' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Telefono</label>
                                <input type="number" className="form-control" onChange={handleChange} name='telefono' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Sexo</label>
                                <select name="sexo" onChange={handleChange} className='form-select'>
                                    <option value="0">Seleccione un sexo</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                    <option>Prefiero no decirlo</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label">Fecha de nacimiento</label>
                                <input type="date" className="form-control" onChange={handleChange} name='fechadenacimiento' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Dirección</label>
                                <input type="text" className="form-control" onChange={handleChange} name='direccion' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" onChange={handleChange} name='correo' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Contraseñá</label>
                                <input type="password" className="form-control" onChange={handleChange} name='contraseña' />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Confirme su contraseña</label>
                                <input type="password" className="form-control" onChange={handleChange} name='contraseña' />
                            </div>
                            <center>
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                            </center>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register