import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import SidebarAdmin from '../../components/SideBarAdmin'
import { AuthContext } from '../../context/UserContext';

const AñadirEspecialidad = () => {

    const { userState } = useContext(AuthContext);

    const [especialidad, setEspecialidad] = useState({
        especialidad: '',
    });

    const [show, setShow] = useState(false);

    const [especialidades, setEspecialidades] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        width: '450px',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })

    const obtenerEspecialidades = async()=>{
        const req = await fetch('http://localhost:3000/obtenerespecialidades', {headers: {token: userState.token}});

        const res = await req.json();

        if(req.ok){
            return setEspecialidades(res);
        }
    }

    const cargarEspecialidad = async (e) => {

        e.preventDefault();

        if(especialidad.especialidad === ''){
            setShow(true);

            return setTimeout(() => {
                setShow(false)
            }, 2000);
        }

        const req = await fetch('http://localhost:3000/cargarespecialidad', {
            method: 'POST',
            body: JSON.stringify(especialidad),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token
            }
        })
        const res = await req.json();

        if (req.ok) {
            setEspecialidades([...especialidades, res])
            document.getElementById('form').reset()
            return Toast.fire(
                'Especialidad cargada',
                '',
                'success'
            )
        }
    }

    const eliminar = async(id)=>{
        const req = await fetch('http://localhost:3000/eliminarespecialidad/'+id,{
            method: 'DELETE',
            headers: {
                token: userState.token
            }
        })

        if(req.ok){
            setEspecialidades(especialidades.filter(e => e._id !== id))
            return Toast.fire(
                'Especialidad eliminada',
                '',
                'success'
            )
        }
    }


    useEffect(()=>{
        obtenerEspecialidades();
    },[])

    return (
        <div className="d-flex flex-nowrap">
            <SidebarAdmin />

            <div className='container'>

                <h1 className='display 3' style={{ marginTop: '3%' }}>Gestionar especialidades</h1>

                <div className="row">
                    
                    <div className="col-6">
                        <h5 style={{marginTop: '50px'}}>Lista de especialidades</h5>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {especialidades.map((especialidad)=>(
                                    <tr>
                                        <td>{especialidad.especialidad}</td>
                                        <td style={{cursor: 'pointer'}} onClick={()=>{eliminar(especialidad._id)}}>eliminar</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='col' id='turnos'>
                        <form onSubmit={cargarEspecialidad} id='form'>

                            <h4 style={{textAlign: 'start', marginTop: '50px'}}>Añadir una especialidad</h4>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder="asdsadas" name="especialidad"  onChange={({ target }) => setEspecialidad({ ...especialidad, [target.name]: target.value })} />
                                <label htmlFor="floatingPassword">Ingresa una nueva especialidad</label>
                            </div>

                            <div class="alert alert-danger" role="alert" style={{maxWidth: '500px', display: (show)?'block':'none' }}>
                                Rellene el campo!
                            </div>

                            <button type="submit" class="btn btn-success" >
                                Guardar especialidad
                            </button>
                        </form>
                    </div>
                
                
                </div>

            </div>
        </div>

    )
}

export default AñadirEspecialidad