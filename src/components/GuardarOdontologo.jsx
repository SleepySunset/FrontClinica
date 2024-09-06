import { useState } from "react";
import PropTypes from "prop-types";

export function GuardarOdontologo({ id, endpoint, metodo }) {
  const URL = `http://localhost:8080/odontologo/${endpoint}`;

  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [nroMatricula, setNroMatricula] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    const datosFormulario = {
      id,
      nombre,
      apellido,
      nroMatricula,
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
        setNroMatricula("");
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
        <label>Nro Matrícula</label>
        <input
          type="text"
          id="nroMatricula"
          value={nroMatricula}
          onChange={(e) => setNroMatricula(e.target.value)}
          required
        />
      </div>

      <button type="submit">Guardar Odontólogo</button>
    </form>
  );
}

GuardarOdontologo.propTypes = {
  id: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  metodo: PropTypes.oneOf(["POST", "PUT"]).isRequired,
};
