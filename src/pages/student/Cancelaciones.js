import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CoursesInfo, AreaMatricula, Tabulado } from "../../components";
import { getCourses } from "../../utils/extras";


const Cancelaciones = () => {
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

    const handelCancelacion = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "courses": [[
                materia.codigo,
                materia.grupo,
                "0.0"
            ]]
        }));
        try{
            const response = await fetch(`https://saraendpoint.azurewebsites.net/Tabular/${tabuladoActual.id}/DeleteMyTabular/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "courses": [materia.codigo, materia.grupo]
                  })
            })
            console.log(tabulado.id)
        const data = await response.json();
        setMessage(["Se ha cancelado la materia exitosamente", "cancelacion-exitosa"]);
        }
        catch(error){
            setMessage(["Ha habido un error al cancelar la materia", "cancelacion-invalida"]);
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
        <div className="home-container" style={{display:"flex",flexDirection: "column"}}>

            <div className="home-header">
                <AreaMatricula userInfo={userInfo} />
            </div>

            <div className="home-left">
                <span className="home-description">Tu tabulado actual</span>
                <form onSubmit={handelCancelacion}>
                    <label className="input-label">Código:</label>
                    <input type="text" className="input-cancelaciones" name="codigo" onChange={handleFormChange}></input>
                    <label className="input-label">Grupo:</label>
                    <input type="text" className="input-cancelaciones" name="grupo" onChange={handleFormChange}></input>

                    <button className="button button-cancelar" type="submit">
                        Cancelar
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

export default Cancelaciones;