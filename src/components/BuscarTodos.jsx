import { useEffect, useState } from "react";
import { Guardar } from "./Guardar";
import { Eliminar } from "./Eliminar";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

export function BuscarTodos({ entidad, manejarVerMenos }) {
  const URL = `http://localhost:8080/${entidad}/buscartodos`;

  useEffect(() => {
    fetch(`${URL}`)
      .then((res) => res.json())
      .then((data) => {
        setListaEntidad(data);
      });
  }, [URL]);

  const [listaEntidad, setListaEntidad] = useState([]);
  const [elemento, setElemento] = useState(null);
  const [action, setAction] = useState(null);
  const [verGuardar, setVerGuardar] = useState(false);

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
                  <button onClick={() => manejarModificar(paciente.id)}>
                    <FiEdit2 />
                  </button>
                </td>
                <td>
                  <button onClick={() => manejarEliminar(paciente.id)}>
                    <AiOutlineDelete />
                  </button>
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
                  <button onClick={() => manejarModificar(odontologo.id)}>
                    <FiEdit2 />
                  </button>
                </td>
                <td>
                  <button onClick={() => manejarEliminar(odontologo.id)}>
                    <AiOutlineDelete />
                  </button>
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
              <th>Nombre odontologo</th>
              <th>Nro Matricula Odontologo</th>
              <th>Nombre Paciente</th>
              <th>DNI Paciente</th>
              <th>Fecha</th>
              <th></th>
              <th></th>
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
                <button onClick={() => manejarModificar(turno.id)}>
                    <FiEdit2/>
                  </button>
                </td>
                <td>
                  <button onClick={() => manejarEliminar(turno.id)}>
                    <AiOutlineDelete />
                  </button>
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

  return (
    <div>
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
      <button className="btn-guardar" onClick={manejarVerMenos}>
        Ver menos
      </button>
    </div>
  );
}

BuscarTodos.propTypes = {
  entidad: PropTypes.string.isRequired,
  manejarVerMenos: PropTypes.func.isRequired
};
