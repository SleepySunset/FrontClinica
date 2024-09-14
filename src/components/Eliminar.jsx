import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function Eliminar({ entidad, id }) {
  const [mensaje, setMensaje] = useState("");
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
          setMensaje("Paciente eliminado con éxito");
        })
        .catch(() => {
          setMensaje("Ha ocurrido un error");
          setTimeout(() => {
            setMensaje("");
          }, 3000);
        });
    }
  }, [id, URL]);

  return <p>{mensaje}</p>;
}

Eliminar.propTypes = {
  id: PropTypes.number.isRequired,
  entidad: PropTypes.string.isRequired,
};
