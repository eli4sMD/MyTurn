import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MiPanel from '../pages/MiPanel'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/mipanel' element={<MiPanel />} />
        </Routes>
    )
}

export default AdminRoutes