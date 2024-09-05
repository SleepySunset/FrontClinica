import { BuscarTodos } from "../components/BuscarTodos";
import { BuscarPorId } from "../components/BuscarPorId";
import { useState } from "react";
import { GuardarPaciente } from "../components/GuardarPaciente";

export function Paciente(){
    const [verBuscarTodos, setVerBuscarTodos] = useState(false);
    const [verBuscarPorId, setVerBuscarPorId] = useState(false);
    const [verGuardarPaciente, setVerGuardarPaciente] = useState(false);
    

    const manejarVerBuscarTodos = () => {
        setVerBuscarTodos(!verBuscarTodos);
    };

    const manejarVerBuscarPorId = () => {
        setVerBuscarPorId(!verBuscarPorId);
    }

    const manejarVerGuardarPaciente = () => {
        setVerGuardarPaciente(!verGuardarPaciente)
    }

    
    return(
        <>
        <h1>Bienvenido a la interfaz de Paciente</h1>
        <p>¿Cómo podemos ayudarte hoy?</p>
        <ul>
            <li>
                <button onClick={manejarVerGuardarPaciente}>
                    Registrar un paciente nuevo
                </button>
                {verGuardarPaciente && <GuardarPaciente endpoint={"guardar"} metodo={"POST"}/>}  
            </li>
            <li>
                <button onClick={manejarVerBuscarTodos}>
                    Ver todos los pacientes registrados
                </button>
                {verBuscarTodos && <BuscarTodos />}
            </li>
            <li>
                <buttton onClick={manejarVerBuscarPorId}>
                    Buscar paciente por ID
                </buttton>
                {verBuscarPorId && <BuscarPorId />}  
            </li>
        </ul>

        </>

        
    )
}