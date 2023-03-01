import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/UserContext';
import ModalValidarPass from '../components/ModalValidarPass';

const Perfil = () => {

    const { userState } = useContext(AuthContext);

    const [editar, setEditar] = useState(true)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);

    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        correo: '',
        telefono: '',
        fechadenacimiento: '',
        direccion: '',
    });

    const [contraseña, setContraseña] = useState({
        contraseña: ''
    });

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    const validarPass = async (e) => {

        e.preventDefault();

        setLoading(true);

        const req = await fetch('http://localhost:3000/validarpass', {
            method: 'POST',
            body: JSON.stringify({contraseña}),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token
            }
        })

        if(!req.ok){
            setLoading(false)
            setShow(true);
            return setTimeout(() => {
                setShow(false)
            }, 2000);
        }

        if(req.ok){
            guardarDatos();
        }
   
    }

    const guardarDatos = async () => {

        const req = await fetch('http://localhost:3000/editar', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'token': userState.token
            }
        })

        if (req.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Los datos han sido actualizados correctamente',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'Green'
              })
              
              const myModal = document.getElementById('exampleModal');
              const modal = bootstrap.Modal.getInstance(myModal);
              
              setLoading(false)
              document.getElementById('form').reset();
              setEditar(true)
              modal.hide();

        }

    }

    const getDatos = async () => {
        const req = await fetch('http://localhost:3000/misdatos', { headers: { token: userState.token } });
        const res = await req.json()
        setData(res);
    }

    useEffect(() => {
        getDatos();
    }, [])

    return (
        <>
            <div className='d-flex flex-nowrap'>
                <Sidebar />

                <div className="container" style={{ marginTop: '3%' }}>

                    <div id='perfil-form' className="row g-3">

                        <div className="col"><h2>Mis datos:</h2></div>

                        <div className="col-2"><button className={`btn ${editar ? 'btn-warning' : 'btn-danger'}`} onClick={() => setEditar(editar ? false : true)}>{editar ? 'Editar datos' : 'Cancelar'}</button></div>
                        <hr />
                        <form>
                        </form>

                        <div className="col-6">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="nombre" id='nombre' value={data.nombre} onChange={handleChange} name='nombre' disabled={editar} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="nombre">Apellido</label>
                            <input type="text" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="apellido" id='apellido' value={data.apellido} onChange={handleChange} name='apellido' disabled={editar} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dni">D.N.I</label>
                            <input type="text" className={`form-control inactive`} placeholder="dni" id='dni' value={data.dni} disabled={true} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="Telefono">Telefono</label>
                            <input type="text" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="Telefono" id='Telefono' value={data.telefono} onChange={handleChange} name='telefono' disabled={editar} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="Sexo">Sexo</label>
                            <input type="text" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="Sexo" id='Sexo' value={data.sexo} onChange={handleChange} name='sexo' disabled={editar} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="fechadenacimiento">Fecha De Nacimiento</label>
                            <input type="date" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="fechadenacimiento" id='fechadenacimiento' value={data.fechadenacimiento} onChange={handleChange} name='fechadenacimiento' disabled={editar} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="Direccion">Dirección</label>
                            <input type="text" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="Direccion" id='Direccion' value={data.direccion} onChange={handleChange} name='direccion' disabled={editar} />
                        </div>

                        <div className="col-6">
                            <label htmlFor="Correo">Correo</label>
                            <input type="email" className={`form-control ${!editar ? 'active' : 'inactive'}`} placeholder="Correo" id='Correo' value={data.correo} onChange={handleChange} name='correo' disabled={editar} />
                        </div>
                        <div className="col">
                            <button type="button" style={{backgroundColor: '#15ddab', border: '0'}} className={`btn btn-success ${!editar ? 'showconfirm' : 'dontshowconfirm'}`} data-bs-toggle="modal" data-bs-target='#exampleModal'>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="modal fade" id='exampleModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ borderRadius: '0px', border: '0px' }}>
                                <div className="modal-body">
                                    <form id='form' onSubmit={validarPass}>
                                        <h5 style={{ textAlign: 'center', margin: '20px 20px 25px 20px' }}>Ingrese su contraseña actual para confirmar cambios.</h5>
                                        <input type="password" className='form form-control' onChange={({ target }) => setContraseña(target.value)} style={{ borderRadius: '0px', marginTop: '15px' }} />
                                        <div class="alert alert-danger" role="alert" style={{maxWidth: '490px', marginTop: '20px', display: (show)?'block':'none' }}>
                                            La contraseña es incorrecta
                                        </div>
                                        <div style={{ textAlign: 'center', margin: '20px' }}>
                                            <button type="submit" className="btn btn-success" style={{ borderRadius: '15px', backgroundColor: '#15ddab', border: '0'}}>{loading?(<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>):'Confirmar cambios'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Perfil