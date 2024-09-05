import { Link } from "react-router-dom";

export function Header(){
    return(
        <header>
            <img src=""/>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/paciente">Paciente</Link>
                    </li>
                    <li>
                        <Link to="/odontologo">Odontólogo</Link>
                    </li>
                    <li>
                        <Link to="/turno">Turno</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}