import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function Eliminar({ entidad, id }) {
  const [message, setMessage] = useState("");
  const URL = `http://localhost:8080/${entidad}/eliminar/${id}`;

  useEffect(() => {
    if (id) {
      fetch(URL, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error en la eliminación");
        })
        .then(() => {
          setMessage("Paciente eliminado con éxito");
        })
    }
  }, [id, URL]);

  return <p>{message}</p>;
}

Eliminar.propTypes = {
  id: PropTypes.number.isRequired,
  entidad: PropTypes.string.isRequired,
};