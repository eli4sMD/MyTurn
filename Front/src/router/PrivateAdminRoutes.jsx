import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

const PrivateAdminRoutes = ({children}) => {
    const { userState } = useContext(AuthContext);

    return !userState.isLogged ? <Navigate to='/login'/> : userState.role === 'admin' ? children : <Navigate to='/login'/>
}

export default PrivateAdminRoutes