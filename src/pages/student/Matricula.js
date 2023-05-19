import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CoursesInfo, AreaMatricula, Tabulado } from "../../components";
import { courses } from "../../utils/exampleData"

import { getCourses } from "../../utils/extras";


const Matricula = () => {

    const [courses, setCourses] = useState([]);
    const endPoint = "https://saraendpoint.azurewebsites.net/Asignatura/None/Search";

    useEffect(() => {
        console.log("useEffect");
        fetch(endPoint)
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
        });
    }, []);

    console.log(courses);

    const userInfo = useLocation().state;
    //console.log(userInfo)

    const tabulado = userInfo.tabulado;
    const materias = getCourses(tabulado.courses);

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
                <AreaMatricula  userInfo={userInfo}/>
            </div>


            <div className="home-right scroll-item">
                <span className="home-description">
                    Consulta de materias<br></br>
                </span>
                <CoursesInfo courses={courses} />

            </div>

            <div className="home-left">
                <span className="home-description">Tu tabulado actual</span>
                <label className="input-label">
                    Código: 
                </label>
                <input type="text" className="input-matricula"></input>
                <label className="input-label">
                    Grupo: 
                </label>
                <input type="text" className="input-matricula"></input>

                <button className="button button-matricular">
                    Matricular
                </button>
                <Tabulado courses={materias} />
            </div>


        </div>
    );
}

export default Matricula;