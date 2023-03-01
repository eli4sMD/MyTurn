import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import types from '../context/types';
import { AuthContext } from '../context/UserContext';
import './style.css';
import Swal from 'sweetalert2';

const Login = () => {

  const navigate = useNavigate();

  const { dispatch, userState } = useContext(AuthContext);


  const [data, setData] = useState({
    dni: '',
    contraseña: ''
  });


  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const login = async (e) => {
    e.preventDefault()

    const req = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await req.json();
    console.log(res);

    if (!req.ok) {
      return Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: res.msg,
        confirmButtonText: 'Volver a intentarlo',
        confirmButtonColor: 'red'
      })
    }


    if (req.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Has iniciado sesión correctamente',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'Green'
      })
      localStorage.setItem('userData', JSON.stringify(res))
      dispatch({
        type: types.login,
        res
      })

      if (res.role === 'paciente') {
        return navigate('/misturnos', { replace: true });
      }

      if (res.role === 'admin') {
        return navigate('/turnos', { replace: true });
      }
    }

    return navigate('/misturnos')

  }

  return (
    <div id='login' className="row">

      <div className="col-8">
        <div id='loginForm'>
          <h1 className='fw-bold' style={{color: '#1ee9b6'}}>Iniciar sesión en MyTurn</h1>
          <br/>
          <form onSubmit={login}>

            <div className="mb-3">
              <label className="form-label">DNI</label>
              <input type="number" className="form-control" onChange={handleChange} name='dni' />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseñá</label>
              <input type="password" className="form-control" onChange={handleChange} name='contraseña' />
            </div>

            <button type="submit" className="btn btn-primary">Iniciar sesion</button>
          </form>
        </div>
      </div>



      <div id='imagen' className='col-4'>
        <div>
          <h3>¿Aún no tienes una cuenta?</h3>
          <Link to='/register' className='btn btn-primary'>Registrarme</Link>
        </div>
      </div>

    </div>
  )
}

export default Login