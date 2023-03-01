import React, { useContext } from 'react'
import { RxCalendar } from 'react-icons/rx';
import { MdOutlineAssignmentReturned } from 'react-icons/md';
import { AiFillCarryOut, AiOutlineProfile } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import types from '../context/types';

const Sidebar = () => {


    const { dispatch, userState } = useContext(AuthContext);


    const cerrarSesion = () => {
        dispatch({ type: types.logout })
    };

    const {pathname} = useLocation();

    const url = pathname;

    if(pathname === '/login' || pathname === '/register'){
        return null
    }

    return (
    <>
            <div className="d-flex flex-column p-3 text-bg-dark" style={{width: '280px', height: '100vh'}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <AiFillCarryOut size={'30px'}/> <span className="fs-2">MyTurn</span>
                </a>
                <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to='/misturnos' className={`nav-link text-white ${(url === '/misturnos')?'active':null}`} aria-current="page">
                                <MdOutlineAssignmentReturned/> Mis turnos
                            </Link>
                        </li>
                        <li>
                            <Link to='/sacarturno'className={`nav-link text-white ${(url === '/sacarturno')?'active':null}`}>
                                <RxCalendar/> Sacar Turno
                            </Link>
                        </li>
                        <li>
                            <Link to='/perfil'className={`nav-link text-white ${(url === '/perfil')?'active':null}`}>
                                <AiOutlineProfile/> Mis Datos
                            </Link>
                        </li>
                        <li>
                            <Link to='/password' className={`nav-link text-white ${(url === '/password')?'active':null}`}>
                                <RiLockPasswordLine/> Contraseña
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                                    <strong>{userState.nombre}</strong>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><a className="dropdown-item" onClick={cerrarSesion}>Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </>
                )
}

                export default Sidebar