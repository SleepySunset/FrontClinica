import PropTypes from "prop-types";
import { useState } from "react";
import { Guardar } from "./Guardar";
import { BuscarPorId } from "./BuscarPorId";
import { BuscarTodos } from "./BuscarTodos";

export function Crud( {entidad, textoRegistro, textoBuscarTodos} ){

    const [verForm, setVerForm] = useState(false);
    const [verGuardar, setVerGuardar] = useState(false);
    const [verTodos, setVerTodos] = useState(false);
    const [verBtnTodos, setVerBtnTodos] = useState(false);
    

    const manejarVerForm = () => {
        setVerForm(!verForm)
        setVerGuardar(!verGuardar)
    }
    const manejarVerTodos = () => {
        setVerTodos(!verTodos);
        setVerBtnTodos(!verBtnTodos);
    };

    const manejarVerMenosGuardar = () => {
        setVerForm(false);
        setVerGuardar(false);
    }

    const manejarVerMenosBuscarTodos = () => {
        setVerTodos(false);
        setVerBtnTodos(false);
    }

   

    return(
        <div className="crud-container">
            {/* <img className="logobg-crud" src="../src/assets/logo1.png"/> */}
            <ul>
            <li>
                <button className="crud-btn" onClick={manejarVerForm} hidden={verGuardar}>
                    {textoRegistro}
                </button>
                {verForm && <Guardar entidad={entidad} endpoint={"guardar"} metodo={"POST"} manejarVerMenos={manejarVerMenosGuardar}/>}
            </li>
            <li>
                <button className="crud-btn" onClick={manejarVerTodos} hidden={verBtnTodos}>
                    {textoBuscarTodos}
                </button>
                {verTodos && <BuscarTodos entidad={entidad} manejarVerMenos={manejarVerMenosBuscarTodos}/>}
            </li>
            <li>   
                <BuscarPorId entidad={entidad}/>
            </li>
        </ul>

        </div>
    )
}

Crud.propTypes = {
    entidad: PropTypes.string.isRequired,
    textoRegistro: PropTypes.string.isRequired,
    textoBuscarTodos: PropTypes.string.isRequired,
};