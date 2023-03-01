import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';

const SacarTurno = () => {


    const navigate = useNavigate();

    const { userState } = useContext(AuthContext);

    const [data, setData] = useState({
        especialidad: '',
        fecha: '',
        hora: ''
    })

    const [show, setShow] = useState(false);

    const horarios = ['7:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];

    const [horariosDisponibles, setHorarios] = useState(horarios)

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }


    const turnos = async (e) => {

        e.preventDefault();

        if (data.especialidad && data.fecha) {
            const req = await fetch('http://localhost:3000/turnos')

            const res = await req.json()

            const turnos = res.filter((turno) => turno.especialidad === data.especialidad && turno.fechanumerica === data.fecha);

            turnos.forEach(i => horarios.splice(horarios.findIndex(e => e === i.hora), 1));

            setHorarios(horarios);


            if (horarios.length > 0) {

                const { value: hora } = await Swal.fire({
                    title: 'Horarios disponibles:',
                    input: 'select',
                    inputOptions: horarios,
                    inputPlaceholder: 'Seleccione un horario.',
                    showCancelButton: true,
                    confirmButtonText: 'Solicitar',
                    confirmButtonColor: '#15ddab',
                    cancelButtonText: 'Cancelar',
                    didOpen: () => {
                        const inputRange = Swal.getInput()

                        inputRange.addEventListener('change', () => {
                            data.hora = horarios[inputRange.value]
                        })
                    },
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (value !== '') {
                                resolve()
                            } else {
                                resolve('Debes seleccionar un horario!')
                            }
                        })
                    }
                })

                if (hora) {
                    solicitarTurno();
                }

                return
            }
        }

        if(!data.especialidad || !data.fecha){
            setShow(true);

            return setTimeout(() => {
                setShow(false)
            }, 2000);
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })


    const solicitarTurno = async () => {

        const req = await fetch('http://localhost:3000/solicitarturno', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                token: userState.token
            }
        })


        if (req.ok) {
            Toast.fire({
                icon: 'success',
                title: 'Turno solicitado'
              })
            return navigate('/misturnos')
        }

    }

    const [min, setMin] = useState('');

    const minFecha = ()=>{
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const dia = fecha.getDate();
        let mes = fecha.getMonth()

        mes=mes+1

        setMin(anio+'-'+0+mes+'-'+dia); 
    }

    const [especialidades, setEspecialidades] = useState([]);

    const obtenerEspecialidades = async()=>{
        const req = await fetch('http://localhost:3000/obtenerespecialidades', {headers: {token: userState.token}});

        const res = await req.json();

        if(req.ok){
            return setEspecialidades(res);
        }
    }

    useEffect(()=>{
        minFecha();
        obtenerEspecialidades();
    },[])

    return (
        <div className="d-flex flex-nowrap">
            <Sidebar />

            <div className='container'>

                <h1 className='display 3' style={{marginTop: '3%'}}>Solicitar un turno.</h1>
                <h5 className='display 6'>¡Cuidamos tu tiempo!</h5>

                <div id='turnos'>
                    <form onSubmit={turnos} style={{ marginTop: '2.5em' }}>

                        <div className="form-floating mb-3">
                            <select type="text" className="form-control" placeholder="n" name="especialidad" onChange={handleChange}>
                                <option>Seleccione una opcion</option>
                                {especialidades.map((e)=>(
                                    <option>{e.especialidad}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingInput">Especialidad</label>
                        </div>

                        <div className="form-floating mb-3" htmlFor='fecha'>
                            <input type="date" id='fecha' className="form-control" placeholder="sadasd" name="fecha" min={min} onChange={handleChange} />
                            <label htmlFor="floatingPassword">Fecha</label>
                        </div>

                        <div class="alert alert-danger" role="alert" style={{maxWidth: '500px', display: (show)?'block':'none' }}>
                            Debe seleccionar una especialidad y una fecha.
                        </div>


                        <button type="submit" class="btn btn-success" >
                            Consultar turnos disponibles
                        </button>
                    </form>
                </div>


                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={solicitarTurno}>
                                    <select className='form-select' name='hora' onChange={handleChange}>
                                        {horariosDisponibles.map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>

                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Solicitar turno</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default SacarTurno