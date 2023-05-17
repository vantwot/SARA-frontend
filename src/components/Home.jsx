import { Tabulado, Calendar } from "./";
import "styles/home.css";
import React, { useContext } from "react"
//import { AuthContext } from "utils/AuthContext";

const Home = () => {
        //const {login_token,setValue} = useContext(AuthContext)

        return (
            // <div class="wrap">
            //     <div class="rights top">XD</div>
            //     <div class="lefts">DD</div>
            //     <div class="rights bot">AD</div>
            // </div>

            <div className="home-container background">

                <div className="home-header">
                    <span className="home-title">¡Bienvenido Geideran!</span>
                    <span className="home-subtitle">
                        Código de estudiante: 1840292<br></br>
                        Programa: Ingeniería de Sistemas (3743)<br></br>
                        Resolución: 047</span>
                </div>


                {/* </div> */}


                <div className="home-right">
                    <span className="home-description">
                        Tu horario
                    </span>
                    <Calendar />
                </div>

                <div className="home-left">
                    <div>
                        <span className="home-description">Semestre actual: Mar 2023 - Dic 2025</span>
                        <div>
                            <Tabulado />
                        </div>

                    </div>
                </div>
            </div>
        );


};

export default Home;