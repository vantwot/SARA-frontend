import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CoursesInfo, AreaMatricula, Tabulado } from "../../components";
import { courses } from "../../utils/exampleData"

import { getCourses } from "../../utils/extras";


const Matricula = () => {
    const materiaInicial = {
        codigo: "",
        grupo: "",
    };

    const [courses, setCourses] = useState([]);
    const [materia, setMateria] = useState(materiaInicial);
    const [message, setMessage] = useState(["",""]);

    const endPoint = "https://saraendpoint.azurewebsites.net/Asignatura/None/Search";

    const userInfo = useLocation().state;
    //console.log(userInfo)

    const tabuladoActual = userInfo.tabulado;
    console.log(tabuladoActual.id);
    const materias = getCourses(tabuladoActual.courses);

    useEffect(() => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
            });
    }, []);

    const [tabulado, setTabulado] = useState([]);
    useEffect(() => {
        fetch(`https://saraendpoint.azurewebsites.net/Tabular/${tabuladoActual.id}/`)
            .then((response) => response.json())
            .then((data) => {
                data.materias = getCourses(data.courses);
                setTabulado(data);
            });
    }, []);

    // console.log(tabulado);

    const handleMatricula = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "courses": [[
                materia.codigo,
                materia.grupo,
                "0.0"
            ]]
        }));
        try{
            const response = await fetch(`https://saraendpoint.azurewebsites.net/Tabular/${tabuladoActual.id}/UpdateMyTabular/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "courses": [[materia.codigo, materia.grupo, "0.0"]]
                  })
            })
        const data = await response.json();
        setMessage(["Se ha matriculado la materia exitosamente", "matricula-exitosa"]);
        }
        catch(error){
            setMessage(["Ha habido un error al matricular la materia", "matricula-invalida"]);
        }
    };

    const handleFormChange = (e) => {
        setMateria({
            ...materia,
            [e.target.name]: e.target.value,
        });
        console.log(materia);
    };


    return (
        <div className="home-container">

            {/* <div className="home-header">
                <span className="home-title">¡Bienvenido xd!</span>
                <span className="home-subtitle">
                    Código de estudiante:s<br></br>
                    Programa: as
                    </span>
            </div> */}


            {/* </div> */}
            <div className="home-header">
                <AreaMatricula userInfo={userInfo} />
            </div>


            <div className="home-right scroll-item">
                <span className="home-description">
                    Consulta de materias<br></br>
                </span>
                <CoursesInfo courses={courses} />

            </div>

            <div className="home-left">
                <span className="home-description">Tu tabulado actual</span>
                <form onSubmit={handleMatricula}>
                    <label className="input-label">
                        Código:
                    </label>
                    <input type="text" className="input-matricula" name="codigo" onChange={handleFormChange}></input>
                    <label className="input-label">
                        Grupo:
                    </label>
                    <input type="text" className="input-matricula" name="grupo" onChange={handleFormChange}></input>

                    <button className="button button-matricular" type="submit">
                        Matricular
                    </button>
                </form>

                <div className={message[1]}>{message[0]}</div>
                {tabulado === [] ? (
                    <Tabulado courses={materias} />
                ) : (
                    <Tabulado courses={tabulado.materias} />
                )}

            </div>


        </div>
    );
}

export default Matricula;