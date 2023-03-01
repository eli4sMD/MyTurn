import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/UserContext';

const Modal = (props) => {

    const {userState} = useContext(AuthContext);

   const [detalles, setDetalles] = useState({
        nombre: '',
        apellido: '',
        dni: '',
    }); 

    useEffect(()=>{
        setDetalles(props.data)
    })

    
    return (
        <div>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#exampleModal${props.id}}`}>
                Ver detalles
            </button>

            <div className="modal fade" id={`exampleModal${props.id}}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Detalles</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row g-3' id='detalles'>
                                <div className="col-6">
                                    <label htmlFor="">Nombre</label>
                                    <input type="text" disabled className='form-control' value={detalles.nombre}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Apellido</label>
                                    <input type="text" disabled className='form-control' value={detalles.apellido}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">D.N.I</label>
                                    <input type="text" disabled className='form-control' value={detalles.dni}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Correo</label>
                                    <input type="text" disabled className='form-control' value={detalles.correo}/>
                                </div>                                
                                <div className="col-6">
                                    <label htmlFor="">Correo</label>
                                    <input type="text" disabled className='form-control' value={detalles.telefono}/>
                                </div>                                
                                <div className="col-6">
                                    <label htmlFor="">Correo</label>
                                    <input type="text" disabled className='form-control' value={detalles.fechadenacimiento}/>
                                </div>                                
                                <div className="col-12">
                                    <label htmlFor="">Dirección</label>
                                    <input type="text" disabled className='form-control' value={detalles.direccion}/>
                                </div>                                
                                <div className="col-6">
                                    <label htmlFor="">Fecha de emision</label>
                                    <input type="text" disabled className='form-control' value={new Date(props.emitido).toLocaleDateString('es-es', { day: 'numeric', year:"numeric", month:"long"})}/>
                                </div>                                
                                <div className="col-6">
                                    <label htmlFor="">Fecha solicitada</label>
                                    <input type="text" disabled className='form-control' value={props.solicitado}/>
                                </div>                                
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal