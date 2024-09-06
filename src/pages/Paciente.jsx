import { BuscarTodos } from "../components/BuscarTodos";
import { BuscarPorId } from "../components/BuscarPorId";
import { useState } from "react";
import { GuardarPaciente } from "../components/GuardarPaciente";

export function Paciente(){
    const [verGuardar, setVerGuardar] = useState(false);
    const [verBuscarTodos, setVerBuscarTodos] = useState(false);
    const [verBuscarPorId, setVerBuscarPorId] = useState(false);
    

    const manejarVerGuardar = () => {
        setVerGuardar(!verGuardar)
    }
    const manejarVerBuscarTodos = () => {
        setVerBuscarTodos(!verBuscarTodos);
    };

    const manejarVerBuscarPorId = () => {
        setVerBuscarPorId(!verBuscarPorId);
    }

    

    
    return(
        <>
        <h1>Bienvenido a la interfaz de Paciente</h1>
        <p>¿Cómo podemos ayudarte hoy?</p>
        <ul>
            <li>
                <button onClick={manejarVerGuardar}>
                    Registrar un paciente nuevo
                </button>
                {verGuardar && <GuardarPaciente endpoint={"guardar"} metodo={"POST"}/>}  
            </li>
            <li>
                <button onClick={manejarVerBuscarTodos}>
                    Ver todos los pacientes registrados
                </button>
                {verBuscarTodos && <BuscarTodos entidad="paciente" />}
            </li>
            <li>
                <buttton onClick={manejarVerBuscarPorId}>
                    Buscar paciente por ID
                </buttton>
                {verBuscarPorId && <BuscarPorId entidad="paciente" />}  
            </li>
        </ul>

        </>

        
    )
}