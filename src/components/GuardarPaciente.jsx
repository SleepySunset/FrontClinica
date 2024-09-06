import { useState } from "react";
import PropTypes from "prop-types";

export function GuardarPaciente({ id, endpoint, metodo }) {
  const URL = `http://localhost:8080/paciente/${endpoint}`;

  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    const datosFormulario = {
      id,
      nombre,
      apellido,
      dni,
      fechaIngreso,
      domicilio: {
        calle,
        numero,
        localidad,
        provincia,
      },
    };

    fetch(`${URL}`, {
      method: `${metodo}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFormulario),
    })
      .then((response) => response.json())
      .then(() => {
        setApellido("");
        setNombre("");
        setDni("");
        setFechaIngreso("");
        setCalle("");
        setNumero("");
        setLocalidad("");
        setProvincia("");
      });
  };

  return (
    <form onSubmit={manejarEnvio}>
      {id && (
        <div>
          <label>ID</label>
          <input type="text" id="id" value={id} readOnly />
        </div>
      )}

      <div>
        <label>Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Apellido</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>

      <div>
        <label>DNI</label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Fecha de Ingreso</label>
        <input
          type="date"
          id="fechaIngreso"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Calle</label>
        <input
          type="text"
          id="calle"
          value={calle}
          onChange={(e) => setCalle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Numero</label>
        <input
          type="number"
          id="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Localidad:</label>
        <input
          type="text"
          id="localidad"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Provincia:</label>
        <input
          type="text"
          id="provincia"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          required
        />
      </div>

      <button type="submit">Guardar Paciente</button>
    </form>
  );
}

GuardarPaciente.propTypes = {
  id: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  metodo: PropTypes.oneOf(["POST", "PUT"]).isRequired,
};
