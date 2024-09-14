import PropTypes from "prop-types";
import { useState } from "react";
import { Guardar } from "./Guardar";
import { BuscarPorId } from "./BuscarPorId";
import { BuscarTodos } from "./BuscarTodos";
import { Boton } from "./Boton";

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
            <ul>
            <li>
                <Boton texto={textoRegistro} manejarClick={manejarVerForm} visibilidad={verGuardar}/>
                {verForm && <Guardar entidad={entidad} endpoint={"guardar"} metodo={"POST"} manejarVerMenos={manejarVerMenosGuardar}/>}
            </li>
            <li>
                <Boton texto={textoBuscarTodos} manejarClick={manejarVerTodos} visibilidad={verBtnTodos}/>
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