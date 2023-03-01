import React, { useContext, useEffect, useState } from 'react'
import SidebarAdmin from '../../components/SideBarAdmin'
import { AuthContext } from '../../context/UserContext';

const Pacientes = () => {

    const { userState } = useContext(AuthContext);

    const [pacientes, setPacientes] = useState([]);

    const [filtro, setFiltro] = useState({
        dni: '',
        nombre: '',
        apellido: '',
    });

    const handleChange = ({target})=>{
        setFiltro({
            ...filtro,
            [target.name]: target.value
        })
    }

    const obtenerPacientes = async () => {

        const req = await fetch('http://localhost:3000/pacientes', {
            method: 'POST',
            body: JSON.stringify(filtro),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token
            }
        })

        const res = await req.json();

        console.log(res);

        if (req.ok) {
            setPacientes(res)
        };
    }

    useEffect(() => {
        obtenerPacientes();
    }, [])

    return (
        <div className="d-flex flex-nowrap">
            <SidebarAdmin />

            <div className="container">
                <h2>Listado de pacientes</h2>

                <h5>Filtrar por:</h5>

                <div id='filtros' className="row">
                    <div className='col-2'>
                        <label>D.N.I</label>
                        <input type="number" className='form-control' placeholder='DNI del paciente' name='dni' onChange={handleChange} />
                    </div>
                    <div className='col-2'>
                        <label>Nombre</label>
                        <input type="text" className='form-control' placeholder='Nombre del paciente' name='nombre' onChange={handleChange} />
                    </div>
                    <div className='col-2'>
                        <label>Apellido</label>
                        <input type="text" className='form-control' placeholder='Apellido del paciente' name='apellido' onChange={handleChange} />
                    </div>
                    {/* <div className="col-2">
                        <label>Fecha</label>
                        <input type="date" name="fecha" className='form-control' onChange={handleChange} />
                    </div> */}
                    <div className="col-2">
                        <br />
                        <button className='btn btn-success' style={{ backgroundColor: '#15ddab', borderRadius: '15px', width: '150px', border: '0' }} onClick={() => obtenerPacientes()}>Filtrar</button>
                    </div>
                </div>

                <table id='misturnos' className="table table-bordered" style={{ marginTop: '2.5em' }}>
                    <thead>
                        <tr>
                            <th scope="col">D.N.I</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Fecha de Nac.</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Ubicacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.length === 0 ? (<td colSpan='5'><center><h4>No hay pacientes</h4></center></td>) : pacientes.map((paciente) => (
                            <tr key={paciente._id}>
                                <td>{paciente.dni}</td>
                                <td>{paciente.nombre}</td>
                                <td>{paciente.apellido}</td>
                                <td>{paciente.fechadenacimiento}</td>
                                <td>{paciente.telefono}</td>
                                <td>{paciente.correo}</td>
                                <td>{paciente.direccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Pacientes