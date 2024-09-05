import { useEffect, useState } from "react";
import { GuardarPaciente } from "./GuardarPaciente";
import { Eliminar } from "./Eliminar";


export function BuscarPorId(){
    
    const [paciente, setPaciente] = useState({});
    const [inputValue, setInputValue] = useState(''); 
    const [id, setId] = useState("");
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [action, setAction] = useState(null);


    const manejarInput = (e) => {
        setInputValue(e.target.value); 
    };

    const manejarBusqueda = () => {
        setId(inputValue);
    };
   
    const URL = `http://localhost:8080/paciente/buscar/${id}`;
    
    useEffect(() =>{
        fetch(`${URL}`)
            .then((res) => res.json())
            .then((data) => {
                setPaciente(data)
            }
        )
    },[URL])

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
        <input 
            type="text" 
            placeholder="Ingrese el ID del paciente"
            value={inputValue}
            onChange={manejarInput}  
        />
        <button onClick={manejarBusqueda}>Buscar Paciente</button>
        
        {id && 
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
                    <tr>
                        <td>{paciente.id}</td>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.dni}</td>
                        <td><button onClick={() => manejarModificar(paciente.id)}>Modificar</button></td>
                        <td><button onClick={() => manejarEliminar(paciente.id)}>Eliminar</button></td>
                    </tr>
                </tbody>
            </table>
        }{action === "modificar" && paciente && (
            <GuardarPaciente endpoint="modificar" metodo="PUT" id={selectedPaciente} />
        )}
        {action === "eliminar" && selectedPaciente && (
            <Eliminar id={selectedPaciente}/>
        )}
        
        </>
    )
}

