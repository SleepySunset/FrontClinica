import { useEffect, useState } from "react";
import { Guardar } from "./Guardar";
import { Eliminar } from "./Eliminar";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

export function BuscarPorId({ entidad }) {
  const [elemento, setElemento] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [id, setId] = useState(null);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
  const [action, setAction] = useState(null);
  const [verGuardar, setVerGuardar] = useState(false);


  const manejarInput = (e) => {
    setInputValue(e.target.value);
  };

  const manejarBusqueda = () => {
    setId(inputValue);
    setBuscando(true);
  };


  useEffect(() => {
    if (buscando && id) { 
      const URL = `http://localhost:8080/${entidad}/buscar/${id}`;

      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setElemento(data);
          setBuscando(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setBuscando(false); 
        })
    }
  }, [buscando, id, entidad]);

  const manejarModificar = (id) => {
    setEntidadSeleccionada(id);
    setAction("modificar");
    setVerGuardar(!verGuardar)
  };

  const manejarEliminar = (id) => {
    setEntidadSeleccionada(id);
    setAction("eliminar");
  };

  const manejarVerMenos = () => {
    setVerGuardar(!verGuardar);
  }

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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellido}</td>
              <td>{elemento.dni}</td>
              <td>
                <button className="btn-modificareliminar" onClick={() => manejarModificar(elemento.id)}>
                  <FiEdit2 />
                </button>
              </td>
              <td>
                <button className="btn-modificareliminar" onClick={() => manejarEliminar(elemento.id)}>
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
            
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
            <tr>
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.apellido}</td>
            <td>{elemento.nroMatricula}</td>
            <td>
              <button className="btn-modificareliminar" onClick={() => manejarModificar(elemento.id)}>
                <FiEdit2 />
              </button>
            </td>
            <td>
              <button className="btn-modificareliminar" onClick={() => manejarEliminar(elemento.id)}>
                <AiOutlineDelete />
              </button>
            </td>
            </tr>
          </tbody>
        </table>
      );
    }
    else if (entidad === "turno") {
      return (
        <table>
          <thead className="tabla-encabezado">
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
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.odontologoResponseDto?.nombre} {elemento.odontologoResponseDto?.apellido}</td>
              <td>{elemento.odontologoResponseDto?.matricula}</td>
              <td>{elemento.pacienteResponseDto?.nombre} {elemento.pacienteResponseDto?.apellido}</td>
              <td>{elemento.pacienteResponseDto?.dni}</td>
              <td>{elemento.fecha}</td>
              <td>
                <button className="btn-modificareliminar" onClick={() => manejarModificar(elemento?.id)}>
                  <FiEdit2 />
                </button>
              </td>
              <td>
                <button className="btn-modificareliminar" onClick={() => manejarEliminar(elemento?.id)}>
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div className="container-buscarporid">
      <input className="input-buscarporid"
        type="text"
        placeholder={`Ingrese el ID del ${entidad}`}
        value={inputValue}
        onChange={manejarInput}
      />
      <button className="crud-btn" onClick={manejarBusqueda}>Buscar {entidad}</button>

      {id && <div className="tabla-container">
        {renderizarTablas()}
        </div>}
      {action === "modificar" && elemento && verGuardar && (
        <Guardar
          entidad={entidad}
          endpoint="modificar"
          metodo="PUT"
          id={entidadSeleccionada}
          manejarVerMenos={manejarVerMenos}
        />
      )}
      {action === "eliminar" && entidadSeleccionada && (
        <Eliminar id={entidadSeleccionada} entidad={entidad} />
      )}
    </div>
  );
}

BuscarPorId.propTypes = {
  entidad: PropTypes.string.isRequired,
};
