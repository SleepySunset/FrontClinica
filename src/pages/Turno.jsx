import { Crud } from "../components/Crud";
import { Titulo } from "../components/Titulo";

export function Turno(){

    return(
        <>
        <div className="container-entidad">
            <Titulo texto="Interfaz de Turno"/>
            <Crud entidad={"turno"} textoRegistro={"Registrar Turno"} textoBuscarTodos={"Ver todos los turnos existentes"}/>
        </div>
        </>
    )
}