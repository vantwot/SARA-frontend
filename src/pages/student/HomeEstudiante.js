import React from "react";
import { useLocation } from "react-router-dom";
import { Tabulado, Calendar } from "../../components";
import { getCourses, getDates } from "../../utils/extras";

import "styles/home.css";

const HomeEstudiante = () => {

    const userInfo = useLocation().state;

    //console.log("Home");
    //console.log(userInfo);

    if (userInfo === null) {
        return (
            <div className="home-container">
                <div className="home-header">
                    <span className="home-title">¡Bienvenido!</span>
                    <span className="home-subtitle">
                        Inicia sesión para ver tu información.
                    </span>
                </div>
            </div>
        );
    }

    const tabulado = userInfo.tabulado;
    const courses = getCourses(tabulado.courses);

    const appointments = getDates(courses);
   // console.log(appointments);

    return (

        <div className="home-container background">

            <div className="home-header">
                <span className="home-title">¡Bienvenido {userInfo.name}!</span>
                <span className="home-subtitle">
                    Código de estudiante: {userInfo.username}<br></br>
                    Programa: {userInfo.program}
                    </span>
            </div>


            {/* </div> */}


            <div className="home-right">
                <span className="home-description">
                    Tu horario
                </span>
                <Calendar appointments={appointments}/>
            </div>

            <div className="home-left">
                <div>
                    <span className="home-description">Semestre actual: {tabulado.semester}</span>
                    <div>
                        <Tabulado courses={courses}/>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default HomeEstudiante;