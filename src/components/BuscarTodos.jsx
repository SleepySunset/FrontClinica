import { useEffect, useState } from "react";
import { Boton } from "./Boton";
import { Guardar } from "./Guardar";
import { Eliminar } from "./Eliminar";
import { BotonAccion } from "./BotonAccion";
import PropTypes from "prop-types";

export function BuscarTodos({ entidad, manejarVerMenos }) {
  
  const [listaEntidad, setListaEntidad] = useState([]);
  const [elemento, setElemento] = useState(null);
  const [action, setAction] = useState(null);
  const [verGuardar, setVerGuardar] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  
  const URL = `http://localhost:8080/${entidad}/buscartodos`;

  useEffect(() => {
    fetch(`${URL}`)
      .then((res) => res.json())
      .then((data) => {
        setListaEntidad(data);
      });
  }, [URL, actualizar]);

  useEffect(() => {
    
  }, [])
  const renderizarTablas = () => {
    if (entidad === "paciente") {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listaEntidad.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.dni}</td>
                <td>
                  <BotonAccion tipo="modificar" manejarClick={() => manejarModificar(paciente.id)}/>
                </td>
                <td>
                  <BotonAccion tipo="eliminar" manejarClick={() => manejarEliminar(paciente.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (entidad === "odontologo") {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>NroMatricula</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listaEntidad.map((odontologo) => (
              <tr key={odontologo.id}>
                <td>{odontologo.id}</td>
                <td>{odontologo.nombre}</td>
                <td>{odontologo.apellido}</td>
                <td>{odontologo.nroMatricula}</td>
                <td>
                  <BotonAccion tipo="modificar" manejarClick={()=>manejarModificar(odontologo.id)}/>
                </td>
                <td>
                  <BotonAccion tipo="eliminar" manejarClick={()=>manejarEliminar(odontologo.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (entidad === "turno") {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Odontólogo</th>
              <th>Matrícula</th>
              <th>Paciente</th>
              <th>DNI</th>
              <th>Fecha</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listaEntidad.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.id}</td>
                <td>
                  {turno.odontologoResponseDto.nombre}{" "}
                  {turno.odontologoResponseDto.apellido}
                </td>
                <td>{turno.odontologoResponseDto.matricula}</td>
                <td>
                  {turno.pacienteResponseDto.nombre}{" "}
                  {turno.pacienteResponseDto.apellido}
                </td>
                <td>{turno.pacienteResponseDto.dni}</td>
                <td>{turno.fecha}</td>
                <td>
                  <BotonAccion tipo="modificar" manejarClick={()=>manejarModificar(turno.id)}/>
                </td>
                <td>
                  <BotonAccion tipo="eliminar" manejarClick={()=>manejarEliminar(turno.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  const manejarModificar = (id) => {
    setElemento(id);
    setAction("modificar");
    setVerGuardar(!verGuardar)
  };

  const manejarEliminar = (id) => {
    setElemento(id);
    setAction("eliminar");
  };

  const manejarVerMenosGuardar = () => {
    setVerGuardar(!verGuardar);
  }

  const manejarActualizar = () => {
    setActualizar(prev => !prev);
  };

  return (
    <div className="buscartodos-container">
      <h2>Tabla de {entidad}s</h2>
      <BotonAccion tipo="cerrar" manejarClick={manejarVerMenos}/>
      <div className="tabla-container">{renderizarTablas()}</div>
      {action === "eliminar" && elemento && (
        <Eliminar id={elemento} entidad={entidad} />
      )}
      {action === "modificar" && elemento && verGuardar && (
        <Guardar
          entidad={entidad}
          endpoint="modificar"
          metodo="PUT"
          id={elemento}
          manejarVerMenos={manejarVerMenosGuardar}
        />
      )}
      
      <div className="btn-container">
        
        <Boton texto="Actualizar" manejarClick={manejarActualizar}/>
      </div>
      
    </div>
  );
}

BuscarTodos.propTypes = {
  entidad: PropTypes.string.isRequired,
  manejarVerMenos: PropTypes.func.isRequired
};
