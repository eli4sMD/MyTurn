import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from '../pages/Login'
import MisTurnos from '../pages/MisTurnos'
import Register from '../pages/Register'
import AdminRoutes from './AdminRoutes'
import PacienteRoutes from './PacienteRoutes'
import PrivateAdminRoutes from './PrivateAdminRoutes'
import PrivatePacienteRoutes from './PrivatePacienteRoutes'
import PublicRoutes from './PublicRoutes'
import SacarTurno from '../pages/SacarTurno'
import Perfil from '../pages/Perfil'
import Turnos from '../pages/admin/Turnos'
import Contraseña from '../pages/Contraseña'
import AñadirEspecialidad from '../pages/admin/AñadirEspecialidad'
import Pacientes from '../pages/admin/Pacientes'

const AppRouter = () => {


    return (
        <BrowserRouter>

            <Routes>

                <Route element={<PublicRoutes />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>

                <Route element={<PrivatePacienteRoutes/>}>
                    <Route path='/misturnos' element={<MisTurnos/>}/>
                    <Route path='/sacarturno' element={<SacarTurno/>}/>
                    <Route path='/perfil' element={<Perfil/>}/>
                    <Route path='/password' element={<Contraseña/>}/>
                </Route>

                <Route path='/turnos' element={<PrivateAdminRoutes>
                    <Turnos/>
                </PrivateAdminRoutes>}/>
                
                <Route path='/add' element={<PrivateAdminRoutes>
                    <AñadirEspecialidad/>
                </PrivateAdminRoutes>}/>
                
                <Route path='/pacientes' element={<PrivateAdminRoutes>
                    <Pacientes/>
                </PrivateAdminRoutes>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter