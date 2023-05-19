import React from "react";
import { useLocation } from "react-router-dom";

import { CoursesInfo, AreaMatricula } from "../../components";
import { courses } from "../../utils/exampleData"


const Matricula = () => {

    const userInfo = useLocation().state;
    console.log(userInfo)

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
            <div className="home-left">
                <AreaMatricula  />
            </div>

            <div className="home-right scroll-item">
                <span className="home-description">
                    Consulta de materias<br></br>
                </span>
                <CoursesInfo courses={courses} />

            </div>


        </div>
    );
}

export default Matricula;