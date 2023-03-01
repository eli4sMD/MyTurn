import React, { Children, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/UserContext'


const PrivatePacienteRoutes = () => {
    const { userState } = useContext(AuthContext);

    const {role} = userState;

    return role === 'paciente' ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivatePacienteRoutes    