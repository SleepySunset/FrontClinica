import { BuscarTodos } from "../components/BuscarTodos";
import { BuscarPorId } from "../components/BuscarPorId";
import { useState } from "react";
import { GuardarOdontologo } from "../components/GuardarOdontologo";

export function Odontologo(){
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
        <h1>Bienvenido a la interfaz de odontólogo</h1>
        <p>¿Cómo podemos ayudarte hoy?</p>
        <ul>
            <li>
                <button onClick={manejarVerGuardar}>
                    Registrar un odontólogo nuevo
                </button>
                {verGuardar && <GuardarOdontologo endpoint={"guardar"} metodo={"POST"}/>}  
            </li>
            <li>
                <button onClick={manejarVerBuscarTodos}>
                    Ver todos los odontólogos registrados
                </button>
                {verBuscarTodos && <BuscarTodos entidad="odontologo" />}
            </li>
            <li>
                <buttton onClick={manejarVerBuscarPorId}>
                    Buscar odontólogo por ID
                </buttton>
                {verBuscarPorId && <BuscarPorId entidad="odontologo" />}  
            </li>
        </ul>
        </>
    )
}