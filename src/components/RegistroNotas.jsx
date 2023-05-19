import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "styles/table.css";


const RegistroNotas = () => {
  // traer estudiantes de la base de datos y guardarlos en el estado estudiantes
  const [estudiantes, setEstudiantes] = useState([]);
  // estado para guardar la asignatura seleccionada por el profesor
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (asignaturaSeleccionada) {
      const dynamicUrl = `https://saraendpoint.azurewebsites.net/Asignatura/${Number(
        asignaturaSeleccionada
      )}/Students/`;
      fetch(dynamicUrl)
        .then((response) => response.json())
        .then((data) => {
          setEstudiantes(data);
        });
    }
  }, [asignaturaSeleccionada]);

  const profeInfo = useLocation().state;
  const getAsignaturas = () => {
    const asignaturas = profeInfo.asignaturas.map((asignatura) => {
      return {
        nombre: asignatura.nombre,
        codigo: asignatura.codigo,
        grupo: asignatura.grupo,
        id: asignatura.id,
      };
    });
    return asignaturas;
  };

  const asignaturas = getAsignaturas();
  const [showModal, setShowModal] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  const handleUpdateNota = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // refrescar estudiantes
    const dynamicUrl = `https://saraendpoint.azurewebsites.net/Asignatura/${Number(
      asignaturaSeleccionada
    )}/Students/`;
    fetch(dynamicUrl)
      .then((response) => response.json())
      .then((data) => {
        setEstudiantes(data);
      });

    setShowModal(false);
  };

  // actualizar la nota del estudiante en la base de datos
  const handleGuardarCambios = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);

      // console.log(newErrors);
    } else {
      const dynamicUrl = `https://saraendpoint.azurewebsites.net/Tabular/UpdateGrade/`;
      fetch(dynamicUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tabulado: selectedEstudiante.id_tabulado,
          grade: parseFloat(selectedEstudiante.nota).toFixed(1),
          code: asignaturaSeleccionada,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Respuesta del servidor:", data);
          // console.log("tabulado seleccionado", selectedEstudiante.id_tabulado);
          // console.log("nota seleccionada", selectedEstudiante.nota);
          // console.log("asignatura seleccionada", asignaturaSeleccionada);
          handleCloseModal();
        })
        .catch((error) => {
          console.log("Error al realizar la solicitud:", error);
        });
    }
  };

  const handleAsignaturasChange = (e) => {
    setAsignaturaSeleccionada(e.target.value);
  };

  const findFormErrors = () => {
    const nota = parseFloat(selectedEstudiante.nota);
    const newErrors = {};

    // console.log("nota", nota);
    // console.log("selectedEstudiante", selectedEstudiante);
    if (!nota || nota > 5 || nota < 0)
      newErrors.nota = "La nota debe estar entre 0 y 5";

    return newErrors;
  };

  return (
    <div>
      <h1 className="title">Registro de notas</h1>

      <select
        className="select"
        name="asignaturas"
        id="asignaturas"
        value={asignaturaSeleccionada}
        onChange={handleAsignaturasChange}
      >
        <option value="">Seleccionar asignatura</option>
        {asignaturas.map((asignatura, index) => (
          <option key={index} value={asignatura.id}>
            {asignatura.nombre} - Grupo: {asignatura.grupo} - Código:{" "}
            {asignatura.codigo}
          </option>
        ))}
      </select>

      <Table striped bordered hover className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-header codigo">Código</th>
            <th className="table-header nombre">Nombre</th>
            <th className="table-header nota">Nota</th>
            <th className="table-header actualizar">Actualizar Nota</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr className="table-row" key={estudiante.codigo}>
              <td className="table-data codigo">{estudiante.codigo}</td>
              <td className="table-data nombre">{estudiante.nombre}</td>
              <td className="table-data nota">{estudiante.nota}</td>
              <td className="table-data actualizar">
                <div>
                  <button
                    className="button"
                    onClick={() => handleUpdateNota(estudiante)}
                  >
                    Actualizar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedEstudiante && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Calificar a {selectedEstudiante.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleGuardarCambios}>
              <Form.Group className="mb-3">
                <Form.Label>Nueva nota:</Form.Label>
                <Form.Control
                  type="number"
                  step={0.1}
                  isInvalid={!!errors.nota}
                  defaultValue={selectedEstudiante.nota}
                  onChange={(e) =>
                    setSelectedEstudiante({
                      ...selectedEstudiante,
                      nota: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nota}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={handleGuardarCambios}
            >
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default RegistroNotas;
