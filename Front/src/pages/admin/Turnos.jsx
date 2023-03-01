import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/UserContext'
import Swal from 'sweetalert2';
import SidebarAdmin from '../../components/SideBarAdmin';
import Modal from '../../components/Modal';

const Turnos = () => {

    const { userState } = useContext(AuthContext);

    const [turnos, setTurnos] = useState([]);

    const [filtro, setFiltro] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        especialidad: '',
        fecha: ''
    });

    const handleChange = ({target})=>{
        setFiltro({
            ...filtro,
            [target.name]: target.value
        })
    }

    const [especialidades, setEspecialidades] = useState([]);

    const obtenerEspecialidades = async()=>{
        const req = await fetch('http://localhost:3000/obtenerespecialidades', {headers: {token: userState.token}});

        const res = await req.json();

        if(req.ok){
            return setEspecialidades(res);
        }
    }

    const obtenerMisTurnos = async () => {

        const req = await fetch('http://localhost:3000/turnosadmin', { 
            method: 'POST',
            body: JSON.stringify(filtro),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token } 
        })

        const res = await req.json();

        console.log(res);

        if (req.ok) {
            setTurnos(res)
        };

        console.log(res);
    }

    const cancelarTurno = (id) => {
        Swal.fire({
            title: 'Estas seguro que quieres cancelar tu turno?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/cancelarturno/${id}`, { method: 'DELETE', headers: { token: userState.token } })
                    .then(data => {
                        if (data.ok) {
                            setTurnos(turnos.filter(e => e._id !== id))
                            Swal.fire(
                                'Turno cancelado!',
                                'Tu turno ha sido cancelado con exito.',
                                'success'
                            )
                        } else {
                            Swal.fire(
                                'Ah ocurrido un error',
                                'No pudimos cancelar tu turno :(.',
                                'error'
                            )
                        }
                    })
            }
        })
    }

    useEffect(() => {
        obtenerMisTurnos();
        obtenerEspecialidades();
    }, [])

    return (
        <>
            <div className="d-flex flex-nowrap">
                <SidebarAdmin />
                <div className="container">
                    <br /><br />
                    <h2>MyAdmin Panel</h2>
                    <h5>Filtrar por:</h5>

                    <div id='filtros' className="row">
                        <div className='col-2'>
                            <label>D.N.I</label>
                            <input type="number" className='form-control' placeholder='DNI del paciente' name='dni' onChange={handleChange}/>
                        </div>
                        <div className='col-2'>
                            <label>Nombre</label>
                            <input type="text" className='form-control' placeholder='Nombre del paciente' name='nombre' onChange={handleChange}/>
                        </div>
                        <div className='col-2'>
                            <label>Apellido</label>
                            <input type="text" className='form-control' placeholder='Apellido del paciente' name='apellido' onChange={handleChange}/>
                        </div>
                        <div className="col-2">
                            <label>Especialidad</label>
                            <select name="especialidad" className="form-control" onChange={handleChange}>
                                <option value=''>Seleccione una opcion</option>
                                {especialidades.map((e)=>(
                                    <option>{e.especialidad}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <label>Fecha</label>
                            <input type="date" name="fecha" className='form-control' onChange={handleChange}/>
                        </div>
                        <div className="col-2">
                            <br/>
                            <button className='btn btn-success' style={{backgroundColor: '#15ddab', borderRadius: '15px', width: '150px', border: '0'}} onClick={()=>obtenerMisTurnos()}>Filtrar</button>
                        </div>
                    </div>

                    
                    <table id='misturnos' className="table table-bordered" style={{ marginTop: '2.5em' }}>
                        <thead>
                            <tr>
                                <th scope="col">D.N.I</th>
                                <th scope="col">Nombre y Apellido</th>
                                <th scope="col">Fecha solicitada</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Especialidad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.length === 0 ? (<td colSpan='5'><center><h4>No hay turnos reservados</h4></center></td>) : turnos.map((turno) => (
                                <tr key={turno._id}>
                                    <td>{turno.idUsuario.dni}</td>
                                    <td>{turno.idUsuario.nombre} {turno.idUsuario.apellido}</td>
                                    <td>{turno.fecha}</td>
                                    <td>{turno.hora}</td>
                                    <td>{turno.especialidad}</td>
                                    <td>Activo</td>
                                    <td>
                                        <Modal data={turno.idUsuario} emitido={turno.createdAt} solicitado={turno.fecha} id={turno.idUsuario._id}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>

        </>


    )
}

export default Turnos