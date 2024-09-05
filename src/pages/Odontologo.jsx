export function Odontologo(){


    const manejarRegistroOdontologo = () =>{

    }

    const manejarBuscarTodos = () => {

    }

    const manejarBuscarPorId = () => {

    }

    return(
        <>
        <h1>Bienvenido a la interfaz de Odontologo</h1>
        <p>¿Cómo podemos ayudarte hoy?</p>
        <ul>
            <li>
                <button onClick={manejarRegistroOdontologo}>
                    Registrar un odontólogo nuevo
                </button>
                {/* {verGuardarPaciente && <GuardarPaciente endpoint={"guardar"} metodo={"POST"}/>}   */}
            </li>
            <li>
                <button onClick={manejarBuscarTodos}>
                    Ver todos los odontólogos registrados
                </button>
                {/* {verBuscarTodos && <BuscarTodos />} */}
            </li>
            <li>
                <buttton onClick={manejarBuscarPorId}>
                    Buscar odontólogo por ID
                </buttton>
                {/* {verBuscarPorId && <BuscarPorId />}   */}
            </li>
        </ul>
        </>
    )
}