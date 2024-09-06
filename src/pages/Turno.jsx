import { BuscarTodos } from "../components/BuscarTodos";
import { BuscarPorId } from "../components/BuscarPorId";
import { useState } from "react";
import { GuardarTurno } from "../components/GuardarTurno";

export function Turno(){
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
        <h1>Bienvenido a la interfaz de turno</h1>
        <p>¿Cómo podemos ayudarte hoy?</p>
        <ul>
            <li>
                <button onClick={manejarVerGuardar}>
                    Registrar un turno nuevo
                </button>
                {verGuardar && <GuardarTurno endpoint={"guardar"} metodo={"POST"}/>}  
            </li>
            <li>
                <button onClick={manejarVerBuscarTodos}>
                    Ver todos los turnos registrados
                </button>
                {verBuscarTodos && <BuscarTodos entidad="turno" />}
            </li>
            <li>
                <buttton onClick={manejarVerBuscarPorId}>
                    Buscar turno por ID
                </buttton>
                {verBuscarPorId && <BuscarPorId entidad="turno" />}  
            </li>
        </ul>
        </>
    )
}