import { Titulo } from "../components/Titulo";
import { Footer } from "../components/Footer";

export function Inicio(){
    return(
       <>
        <div className="container-inicio">
            <img className="logobg" src="../src/assets/logo1.png"/>
            <Titulo texto="Bienvenido a OdontoSalud"/>
            <div className="crud">
                <p>OdontoSalud es una clínica odontológica desarrollada como ejercitación para el curso 
                    de BackEnd de DigitalHouse.
                    En esta web encontrarás el CRUD de 3 diferentes entidades: Paciente, Odontólogo y Turno y podrás realizar
                    solicitudes simples a nuestra base de datos para interactuar con ella.
                </p>
                <div>
                    <img src="../src/assets/edit.png"/>
                    <img src="../src/assets/file.png"/>
                    <img src="../src/assets/changes.png"/>
                    <img src="../src/assets/delete.png"/>
                </div>
            </div>
            <div className="tecnologias">
                <p>El backend de la aplicación se desarrolló en Java haciendo uso de SpringBoot y el front se desarrolló con
                React y se estilizó con Sass.</p>
                <div>
                    <img src="../src/assets/javalogo.webp"/>
                    <img src="../src/assets/springlogo.png"/>
                    <img src="../src/assets/reactlogo.png"/>
                    <img src="../src/assets/sasslogo.png"/>
                </div>
                
            </div>
        </div>
        <Footer/>
        </>
    )
}