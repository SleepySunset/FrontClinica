import { useEffect, useState } from "react";
import { GuardarPaciente } from "./GuardarPaciente";
import { Eliminar } from "./Eliminar";
import PropTypes from "prop-types";

export function BuscarTodos( {entidad} ){

    const URL = `http://localhost:8080/${entidad}/buscartodos`;
    
    useEffect(() =>{
        fetch(`${URL}`)
            .then((res) => res.json())
            .then((data) => {
                setListaEntidad(data)
            })
    },[URL])
    
    const [listaEntidad, setListaEntidad] = useState([]);
    const [elemento, setElemento] = useState(null);
    const [action, setAction] = useState(null);
    
    

   const renderizarTablas = () => {
    if(entidad === "paciente"){
        return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {listaEntidad.map((paciente) => (
                <tr key={paciente.id}>
                    <td>{paciente.id}</td>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido}</td>
                    <td>{paciente.dni}</td>
                    <td>
                        <button onClick={() => manejarModificar(paciente.id)}>
                            Modificar
                        </button>
                        
                    </td>
                    <td>
                        <button onClick={() => manejarEliminar(paciente.id)}>
                            Eliminar
                        </button>
                    </td>
                </tr>
        ))}
            </tbody>
        </table>
        
        )
    }else if(entidad === "odontologo"){
        return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>NroMatricula</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {listaEntidad.map((odontologo) => (
                <tr key={odontologo.id}>
                    <td>{odontologo.id}</td>
                    <td>{odontologo.nombre}</td>
                    <td>{odontologo.apellido}</td>
                    <td>{odontologo.dni}</td>
                    <td>
                        <button onClick={() => manejarModificar(odontologo.id)}>
                            Modificar
                        </button>
                        
                    </td>
                    <td>
                        <button onClick={() => manejarEliminar(odontologo.id)}>
                            Eliminar
                        </button>
                    </td>
                </tr>
        ))}
            </tbody>
        </table>
        
        )
    }if (entidad === "turno"){
        return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre odontologo</th>
                    <th>Nro Matricula Odontologo</th>
                    <th>Nombre Paciente</th>
                    <th>DNI Paciente</th>
                    <th>Fecha</th>
                    
                </tr>
            </thead>
            <tbody>
                {listaEntidad.map((turno) => (
                <tr key={turno.id}>
                    <td>{turno.id}</td>
                    <td>{turno.odontologo.nombre}</td>
                    <td>{turno.odontologo.nroMatricula}</td>
                    <td>{turno.paciente.nombre}</td>
                    <td>{turno.paciente.dni}</td>
                    <td>{turno.fecha}</td>
                    <td>
                        <button onClick={() => manejarModificar(turno.id)}>
                            Modificar
                        </button>
                        
                    </td>
                    <td>
                        <button onClick={() => manejarEliminar(turno.id)}>
                            Eliminar
                        </button>
                    </td>
                </tr>
        ))}
            </tbody>
        </table>
        )
    }
        return null;    
    }
    

    const manejarModificar = (id) => {
        setElemento(id);
        setAction("modificar");        
    }

    const manejarEliminar = (id) => {
        setElemento(id);
        setAction("eliminar");
        
    }

return(
    <>
    <h1>Listando todos los {entidad}s</h1>
    <div>
        {renderizarTablas()}
    </div>
    {action === "eliminar" && elemento && (
        <Eliminar id={elemento} entidad={entidad}/>
    )}
    {action === "modificar" && elemento && (
        <GuardarPaciente endpoint="modificar" metodo="PUT" id={elemento} />
    )}
        
    </>
)
    
}

BuscarTodos.propTypes = {
    entidad: PropTypes.string.isRequired,
  };
