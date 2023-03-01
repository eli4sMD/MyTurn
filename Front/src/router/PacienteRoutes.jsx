import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MisTurnos from '../pages/MisTurnos'

const PacienteRoutes = () => {
    return (
            <Routes>
                <Route path='/misturnos' element={<MisTurnos />} />
            </Routes>
    )
}

export default PacienteRoutes