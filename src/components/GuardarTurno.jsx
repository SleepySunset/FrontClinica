import { useState } from "react";
import PropTypes from "prop-types";

export function GuardarTurno( {id, endpoint, metodo}) {

  const URL = `http://localhost:8080/turno/${endpoint}`;

  const [pacienteId, setPacienteId] = useState("");
  const [odontologoId, setOdontologoId] = useState("");
  const [fecha, setFecha] = useState("");


  const manejarEnvio = (e) => {
    e.preventDefault();
  

  const datosFormulario = {
    id,
    pacienteId,
    odontologoId,
    fecha
    }
  

  fetch(`${URL}`, {
    method: `${metodo}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosFormulario),
  })
    .then((response) => response.json())
    .then(() => {
      setPacienteId("");
      setOdontologoId("");
      setFecha("");
    });

}



  return (
    <form onSubmit={manejarEnvio}>
      {id && (
        <div>
          <label>ID</label>
          <input
            type="text"
            id="id"
            value={id}
            readOnly
          />
        </div>
      )}

      <div>
        <label>Paciente ID</label>
        <input    
            type="text"
            id="nombre"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
        />
      </div>

      <div>
        <label>Odontólogo ID</label>
        <input 
            type="text" 
            id="apellido"
            value={odontologoId}
            onChange={(e) => setOdontologoId(e.target.value)}
            required
        />
      </div>

      <div>
        <label>Nro Matrícula</label>
        <input
            type="text"
            id="nroMatricula"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required            
        />
      </div>

      <button type="submit">Guardar Odontólogo</button>
    </form>
  );
}

GuardarTurno.propTypes = {
  id: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  metodo: PropTypes.oneOf(["POST", "PUT"]).isRequired,
};