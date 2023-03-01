import React, { useContext } from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../context/UserContext'
import Swal from 'sweetalert2';

const Contraseña = () => {

    const { userState } = useContext(AuthContext);

    const [data, setData] = useState({
        contraseñaActual: '',
        contraseñaNueva: '',
        confirmarContraseña: ''
    })
    const [show, setShow] = useState(false);

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    };

    const cambiarPass = async () => {

        if (data.contraseñaNueva !== data.confirmarContraseña) {
            setShow(true);

            return setTimeout(() => {
                setShow(false);
            }, 1000);
        }

        const req = await fetch('http://localhost:3000/editarpass', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token
            }
        })

        const res = await req.json();

        if (!req.ok) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Volver a intentarlo',
                confirmButtonColor: '#ffc107',
                text: res.msg
              })
        }

        Swal.fire({
            icon: 'success',
            title: res.msg,
            confirmButtonText: 'Ok',
            confirmButtonColor: 'Green'
          })
        document.getElementById('form').reset();
    }


    return (
        <div className='d-flex flex-nowrap'>
            <Sidebar />

            <div className='container' style={{ marginTop: '2%' }}>
                <h2 style={{marginTop: '2%'}}>Contraseña y seguridad.</h2>
                <hr />
                <form id='form'>
                    <label style={{ fontSize: '15px' }} >Contraseña Actual</label>
                    <input type="password" className='form form-control' placeholder='Ingrese su contraseñá actual' onChange={handleChange} name="contraseñaActual" style={{ borderRadius: '0', maxWidth: '500px', marginBottom: '20px' }} />
                    <label style={{ fontSize: '15px' }} >Contraseña nueva</label>
                    <input type="password" className='form form-control' placeholder='Ingrese una nueva contraseña' onChange={handleChange} name="contraseñaNueva" style={{ borderRadius: '0', maxWidth: '500px', marginBottom: '20px' }} />
                    <label style={{ fontSize: '15px' }} >Confirmar Contraseña</label>
                    <input type="password" className='form form-control' placeholder='Vuelva a escribir la contraseña' onChange={handleChange} name="confirmarContraseña" style={{ borderRadius: '0', maxWidth: '500px', marginBottom: '20px' }} />
                    <div class="alert alert-danger" role="alert" style={{maxWidth: '500px', display: (show)?'block':'none' }}>
                        Las contraseñas no coinciden
                    </div>
                    <button type='button' className='btn btn-warning' style={{ borderRadius: '20px', fontSize: '1.1em' }} onClick={cambiarPass}>Cambiar contraseña</button>
                </form>


            </div>
        </div>
    )
}

export default Contraseña