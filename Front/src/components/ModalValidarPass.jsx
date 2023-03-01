import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ModalValidarPass = (props) => {

    const { userState } = useContext(AuthContext);
    

    return (
        <div>
            <button type="button" className={props.class} data-bs-toggle="modal" data-bs-target='#exampleModal'>
                Guardar
            </button>

            <div className="modal fade" id='exampleModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ borderRadius: '0px', border: '0px' }}>
                        <div className="modal-body">
                            <form id='form' onSubmit={validarPass}>
                                <h5 style={{ textAlign: 'center', margin: '20px 20px 25px 20px' }}>Ingrese su contraseña actual para confirmar cambios.</h5>
                                <input type="password" className='form form-control' onChange={({ target }) => setContraseña(target.value)} style={{ borderRadius: '0px', marginTop: '15px' }} />
                                <div style={{ textAlign: 'center', margin: '20px' }}>
                                    <button type="submit" className="btn btn-success" style={{ borderRadius: '15px' }} /* data-bs-dismiss="modal" */>Guardar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalValidarPass