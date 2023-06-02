import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabulado, Calendar } from "../../components";
import { getCourses, getDates } from "../../utils/extras";
import { Row, Col, Dropdown } from "react-bootstrap";

import "styles/home.css";


const Tabulados = () => {

    const [tabuladoSeleccionado, setTabuladoSeleccionado] = useState(0);

    const userInfo = useLocation().state;
    const tabuladoActual = userInfo.tabulado;
    const courses = getCourses(tabuladoActual.courses);

    //console.log("Home");

    const [tabulados, setTabulados] = useState([]);
    const endPoint = "https://saraendpoint.azurewebsites.net/Tabular/"+'' + userInfo.username + '/StudentTabular';

    useEffect(() => {
        fetch(endPoint)
        .then((response) => response.json())
        .then((data) => {
            for(var i = 0; i < data.length; i++){
                data[i].courses = getCourses(data[i].courses);
            }
            setTabulados(data);
            setTabuladoSeleccionado(0);
        });
    }, []);

    console.log(tabulados);
    // const appointments = getDates(courses);
    // console.log(appointments);



    // useEffect(() => {
    //     setTabuladoSeleccionado(tabulado.semester);
    // }, [tabulado.semester]);

    const handleTabuladoChange = (e) => {   
        setTabuladoSeleccionado(e.target.value);
    };

    return (

        <div className="home-container">

            <Row>
                <Col xs={6}>
                    <div className="info-card">
                        <span className="home-title border-bottom">
                            Consulta tus tabulados
                        </span>

                        <span className="home-subtitle">
                            Código de estudiante: {userInfo.username}<br></br>
                            Programa: {userInfo.program}<br></br>
                            Semestre actual: {tabuladoActual.semester}
                        </span>
                    </div>
                </Col>


                {/* </div> */}

                <Col xs={6}>

                    <div className="tabulados">
                        <span className="home-description">
                            Tabulados
                        </span>

                        <select
                            className="select-full"
                            name="asignaturas"
                            id="asignaturas"
                            value={30}
                            onChange={handleTabuladoChange}
                        >
                            <option value="">Seleccionar periodo</option>
                            {tabulados.map((tabulado, index) => (
                                <option key={index} value={index}>
                                    {tabulado["semester:"]}
                                </option>
                            ))}
                        </select>

                        {/* <Calendar appointments={appointments} /> */}
                        {tabulados.length > 0 ? (
                            <Tabulado courses={tabulados[tabuladoSeleccionado].courses} />
                        ) : (
                            <Tabulado courses={courses} />
                        )}
                    </div>

                </Col>
            </Row>
        </div>
    );
};


export default Tabulados;