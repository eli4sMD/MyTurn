import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/UserContext'

const PublicRoutes = () => {

    const { userState } = useContext(AuthContext)

    return !userState.isLogged ? <Outlet /> : <Navigate to='/inicio' />

}

export default PublicRoutes