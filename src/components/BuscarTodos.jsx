import { useEffect, useState } from "react";
import { GuardarPaciente } from "./GuardarPaciente";
import { Eliminar } from "./Eliminar";

export function BuscarTodos(){
    
    const [listaPacientes, setListaPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [action, setAction] = useState(null);
    
    const URL = "http://localhost:8080/paciente/buscartodos";
    
    useEffect(() =>{
        fetch(`${URL}`)
            .then((res) => res.json())
            .then((data) => {
                setListaPacientes(data)
            })
    },[])

    

    const manejarModificar = (id) => {
        setSelectedPaciente(id);
        setAction("modificar");
    }

    const manejarEliminar = (id) => {
        setSelectedPaciente(id);
        setAction("eliminar");
    }

return(
    <>
    <h1>Listando todos los pacientes</h1>
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
            {listaPacientes.length > 0 ? (
                listaPacientes.map((paciente) => (
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
                ))
            ) : (
                <tr>
                    <td colSpan="3">Cargando pacientes...</td>
                </tr>
            )}

        </tbody>
    </table>
    {action === "modificar" && selectedPaciente && (
        <GuardarPaciente endpoint="modificar" metodo="PUT" id={selectedPaciente} />
    )}
    {action === "eliminar" && selectedPaciente && (
        <Eliminar id={selectedPaciente}/>
    )}
    </>
    )
    
}    
