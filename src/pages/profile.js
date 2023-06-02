import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/logreg.css";
import univalle from "./login-register/Univalle.svg.png";

// booststrap css
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const edit = useLocation().state;
  const navigate = useNavigate();

  // Define el estado para los campos editables
  const [name, setName] = useState(edit.name);
  const [last_name, setLastName] = useState(edit.last_name);
  const [program, setProgram] = useState(edit.program);
  const [role, setRole] = useState(edit.role);
  const [username, setUsername] = useState(edit.username);

  // Manejador de cambios para el campo de nombre
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Manejador de cambios para el campo de apellido
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // Manejador de cambios para el campo de programa
  const handleProgramChange = (e) => {
    setProgram(e.target.value);
  };

  // Manejador de cambios para el campo de rol
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Manejador de cambios para el campo de nombre de usuario
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud PUT al servidor para guardar los cambios
      const response = await fetch(
        `https://saraendpoint.azurewebsites.net/user/${edit.user_id}/update_user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: name,
          }),
        }
      );

      if (response.ok) {
        //console.log("Cambios guardados:", name, program, role, username);
        // Muestra una notificación de éxito
        toast.success("Los cambios se han realizado correctamente");
        // espera 3 segundos antes de redirigir al usuario
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        //console.error("Error al guardar los cambios.");
        toast.error("Error al guardar los cambios");
      }
    } catch (error) {
      //console.error("Error de conexión:", error);
      toast.error("Error de conexión");
    }
  };

  return (
    <center>
      <div className="center">
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="style.css" />
        {/*--------------------- Main Container ------------------------*/}
        <form onSubmit={handleSubmit}>
          <div className="container d-flex justify-content-center align-items-center min-vh-100">
            {/*--------------------- Profile Container ------------------------*/}
            <div className="row border rounded-5 p-3 bg-white shadow box-area">
              {/*------------------------- Left Box ---------------------------*/}
              <div
                className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                style={{ background: "#ffffff" }}
              >
                <div className="featured-image mb-3">
                  <img
                    src={univalle}
                    className="img-fluid"
                    style={{ width: 250 }}
                    alt=""
                  />
                </div>
                <label
                  className="text-red fs-2"
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    fontWeight: 600,
                  }}
                >
                  Hola! {name}
                </label>
                <small
                  className="text-red text-wrap text-center"
                  style={{
                    width: "17rem",
                    fontFamily: '"Courier New", Courier, monospace',
                  }}
                >
                  Aqui puedes actualizar tus datos
                </small>
              </div>
              {/*------------------ ------ Right Box --------------------------*/}
              <div className="col-md-6 right-box">
                <div className="row align-items-center">
                  <div className="header-text mb-2">
                    <h3>Actualizacion de datos</h3>
                    <p>Al guardar sus datos sera enviado a login</p>
                  </div>

                  {/* Campos editables */}
                  {/* nombre */}
                  <div>
                    <label className="fw-bold">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="form-control form-control-lg bg-light fs-6"
                    />
                  </div>
                  {/* apellido */}
                  <div>
                    <label className="fw-bold mt-2">Apellido</label>
                    <input
                      type="text"
                      value={last_name}
                      onChange={handleLastNameChange}
                      className="form-control form-control-lg bg-light fs-6"
                    />
                  </div>
                  {/* programa */}
                  <div>
                    <label className="fw-bold mt-2">Programa</label>
                    <input
                      disabled
                      type="text"
                      value={program}
                      onChange={handleProgramChange}
                      className="form-control form-control-lg bg-light fs-6"
                    />
                  </div>
                  {/* rol */}
                  <div>
                    <label className="fw-bold mt-2">Rol</label>
                    <input
                      disabled
                      type="text"
                      value={role}
                      onChange={handleRoleChange}
                      className="form-control form-control-lg bg-light fs-6"
                    />
                  </div>
                  {/* nombre de usuario */}
                  <div>
                    <label className="fw-bold mt-2">Codigo</label>
                    <input
                      disabled
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      className="form-control form-control-lg bg-light fs-6"
                    />
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-danger w-100 fs-6"
                    type="submit"
                  >
                    Guardar cambios
                  </button>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </form>
      </div>
    </center>
  );
};

export default Profile;
