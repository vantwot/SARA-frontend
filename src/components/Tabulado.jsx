import React from "react";
import Table from "react-bootstrap/Table";

import "styles/table.css";

const Tabulado = ( {courses} ) => {

    if(courses === undefined) return (
        <div>
            <Table striped bordered hover className="table">
                <thead className="table-header">
                    <tr className="table-row">
                        <th className="table-header codigo">Código</th>
                        <th className="table-header grupo">Grupo</th>
                        <th className="table-header asignatura">Asignatura</th>
                        <th className="table-header nota">Nota</th>
                        <th className="table-header creditos">Creditos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-row">
                        <td className="table-data codigo">-</td>
                        <td className="table-data grupo">-</td>
                        <td className="table-data asignatura">-</td>
                        <td className="table-data nota">-</td>
                        <td className="table-data creditos">-</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
    return (
        <div>
            <Table striped bordered hover className="table">
                <thead className="table-header">
                    <tr className="table-row">
                        <th className="table-header codigo">Código</th>
                        <th className="table-header grupo">Grupo</th>
                        <th className="table-header asignatura">Asignatura</th>
                        <th className="table-header nota">Nota</th>
                        <th className="table-header creditos">Creditos</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((materia, index) => (
                        <tr className="table-row" key={index}>
                            <td className="table-data codigo">{materia.code}</td>
                            <td className="table-data grupo">{materia.group}</td>
                            <td className="table-data asignatura">{materia.name}</td>
                            <td className="table-data nota">{materia.grade}</td>
                            <td className="table-data creditos">{materia.credits}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Tabulado;