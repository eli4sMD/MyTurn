import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/UserContext'
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';

const MisTurnos = () => {

  const { userState } = useContext(AuthContext);

  const [turnos, setTurnos] = useState([]);

  const obtenerMisTurnos = async () => {

    const req = await fetch('http://localhost:3000/misturnos', { headers: { token: userState.token } })

    const res = await req.json();

   /*  res.map((e) => {
      e.fecha = new Date(e.fecha).toDateString();
    }) */

    if (req.ok) {
      setTurnos(res)
    };

  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    width: '450px',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })


  const cancelarTurno = (id) => {
    Swal.fire({
      title: '¿Estas seguro que quieres cancelar tu turno?',
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
              Toast.fire(
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
  }, [])

  return (
    <>
      <div className="d-flex flex-nowrap">
        <Sidebar/>

        <div className="container">

          <h1 style={{marginTop: '3%'}}>Mis turnos</h1>

          <table id='misturnos' className="table table-bordered" style={{ marginTop: '2.5em' }}>
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Estado del turno</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos.length===0?(<td colSpan='5'><center><h4>No tienes turnos reservados</h4></center></td>):turnos.map((turno) => (
                <tr key={turno._id}>
                  <td>{turno.fecha}</td>
                  <td>{turno.hora}</td>
                  <td>{turno.especialidad}</td>
                  <td>Activo</td>
                  <td>
                    <button className='btn btn-warning'>Reprogramar</button>

                    <button className='btn btn-danger' onClick={() => cancelarTurno(turno._id)}>Cancelar</button>
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

export default MisTurnos