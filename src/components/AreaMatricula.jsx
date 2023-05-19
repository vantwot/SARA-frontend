import React from "react";

const AreaMatricula = ({ userInfo }) => {

    //console.log(userInfo);

    return (
        <div>
            <span className="home-description">Área de matrícula</span>

            <span className="subtitle-info subtitle-left">
                Nombre del estudiante: 
            </span>
            <span className="subtitle-info subtitle-right">
                {userInfo.name} {userInfo.last_name}
            </span>
            <span className="subtitle-info subtitle-left">
                Código de estudiante: 
            </span>
            <span className="subtitle-info subtitle-right">
                {userInfo.username}
            </span>
            <span className="subtitle-info subtitle-left">
                Programa:
            </span>
            <span className="subtitle-info subtitle-right">
                {userInfo.program}
            </span>
        </div>
    )
}

export default AreaMatricula;