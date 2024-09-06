import { useEffect, useState } from "react";
import { GuardarOdontologo } from "./GuardarOdontologo";
import { Eliminar } from "./Eliminar";
import PropTypes from "prop-types";

export function BuscarPorId({ entidad }) {
  const [elemento, setElemento] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState("");
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
  const [action, setAction] = useState(null);

  const manejarInput = (e) => {
    setInputValue(e.target.value);
  };

  const manejarBusqueda = () => {
    setId(inputValue);
  };

  const URL = `http://localhost:8080/${entidad}/buscar/${id}`;

  useEffect(() => {
    fetch(`${URL}`)
      .then((res) => res.json())
      .then((data) => {
        setElemento(data);
      });
  }, [URL]);

  const manejarModificar = (id) => {
    setEntidadSeleccionada(id);
    setAction("modificar");
  };

  const manejarEliminar = (id) => {
    setEntidadSeleccionada(id);
    setAction("eliminar");
  };

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
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.apellido}</td>
            <td>{elemento.dni}</td>
            <td>
              <button onClick={() => manejarModificar(elemento.id)}>
                Modificar
              </button>
            </td>
            <td>
              <button onClick={() => manejarEliminar(elemento.id)}>
                Eliminar
              </button>
            </td>
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
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.apellido}</td>
            <td>{elemento.dni}</td>
            <td>
              <button onClick={() => manejarModificar(elemento.id)}>
                Modificar
              </button>
            </td>
            <td>
              <button onClick={() => manejarEliminar(elemento.id)}>
                Eliminar
              </button>
            </td>
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
            </tr>
          </thead>
          <tbody>
            <td>{elemento.id}</td>
            <td>{elemento.odontologo.nombre}</td>
            <td>{elemento.odontologo.nroMatricula}</td>
            <td>{elemento.paciente.nombre}</td>
            <td>{elemento.paciente.dni}</td>
            <td>{elemento.fecha}</td>
            <td>
              <button onClick={() => manejarModificar(elemento.id)}>
                Modificar
              </button>
            </td>
            <td>
              <button onClick={() => manejarEliminar(elemento.id)}>
                Eliminar
              </button>
            </td>
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <>
      <input
        type="text"
        placeholder={`Ingrese el ID del ${entidad}`}
        value={inputValue}
        onChange={manejarInput}
      />
      <button onClick={manejarBusqueda}>Buscar {entidad}</button>

      {id && <div>{renderizarTablas()}</div>}
      {action === "modificar" && elemento && (
        <GuardarOdontologo
          endpoint="modificar"
          metodo="PUT"
          id={entidadSeleccionada}
        />
      )}
      {action === "eliminar" && entidadSeleccionada && (
        <Eliminar id={entidadSeleccionada} entidad={entidad} />
      )}
    </>
  );
}

BuscarPorId.propTypes = {
  entidad: PropTypes.string.isRequired,
};
