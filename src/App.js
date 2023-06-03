import React from "react";
import './App.css'
import Login from './pages/login-register/Login';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "./pages/profile";
import { Layout } from "./components";
import { HomeEstudiante, Matricula, Tabulados, Cancelaciones} from "./pages/student/";
import Profesor from "./pages/Profesor";
import Recovery from "./pages/login-register/recoverpass.jsx"
import HomeProfesor from "./pages/HomeProfesor";

function App() {
  const categories = [{ name: "Cancelaciones", slug: "estudiante/cancelaciones" }, { name: "Matricular", slug: "estudiante/matricula" }, { name: "Tabulados", slug: "estudiante/tabulados" }, { name: "Perfil", slug: "profile" }, {name: "Cerrar Sesión", slug: ""}]
  const categoriesProfe = [{ name: "Perfil", slug: "profile" }, {name: "Cerrar Sesión", slug: ""}]

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='estudiante' element={<Layout categories={categories}> </Layout>}>
          <Route index element={<HomeEstudiante />} />
          <Route path='home' element={<HomeEstudiante />} />
          <Route path='matricula' element={<Matricula />} />
          <Route path='tabulados' element={<Tabulados />} />
          <Route path='cancelaciones' element={<Cancelaciones />} />
        </Route>
        <Route path='/home' exact element={<Layout categories={categories}> <HomeProfesor /> </Layout>} /> 
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/recover' exact element={<Recovery />} />
        <Route path='/profesor' exact element={<Layout categories={categoriesProfe}> <Profesor  /> </Layout>} />
      </Routes>
    </>
  );


}

export default App;
