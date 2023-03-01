import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import types from '../context/types';
import { AuthContext } from '../context/UserContext'

const Navbar = () => {

    const { isLogged, dispatch } = useContext(AuthContext);


    const cerrarSesion = () => {
        dispatch({ type: types.logout })
    };


    const {pathname} = useLocation();


    if(pathname === '/login' || pathname === '/register'){
        return null
    }

     return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MyTurn</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='mx-auto'></div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/misturnos' className="nav-link">Mis turnos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/sacarturno' className="nav-link">Sacar turno</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className="nav-link" onClick={cerrarSesion}>Cerrar sesion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar