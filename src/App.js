import React from "react";
import './App.css'
import Login from './pages/login-register/Login';
//import { Navbar } from "./bars/Navbar";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "./pages/profile";
import Statistics from "./pages/statistics";
import { Layout } from "./components";
import {Matricula } from "./pages/student/";
import HomeEstudiante from "./pages/student/HomeEstudiante";
import Profesor from "./pages/Profesor";
import Recovery from "./pages/login-register/recoverpass.jsx"
import HomeProfesor from "./pages/HomeProfesor";

function App() {
  // const [currentForm, setCurrentForm] = useState('login')//useState('page') or useState('login')

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  const categories = [{ name: "Matricular", slug: "estudiante/matricula" }, { name: "Tabulados", slug: "estudiante/tabulados" }, { name: "Perfil", slug: "profile" }]
  const categoriesProfe = [{ name: "Perfil", slug: "profile" }]

  return (

    // <div className = {(currentForm === 'login') ? 'App-login' : 'App-page'}>
    //   {
    //     // currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='estudiante' element={<Layout categories={categories}> </Layout>}>
          <Route index element={<HomeEstudiante />} />
          <Route path='home' element={<HomeEstudiante />} />
          <Route path='matricula' element={<Matricula />} />
        </Route>
        <Route path='/home' exact element={<Layout categories={categories}> <HomeProfesor /> </Layout>} /> 
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/statistics' exact element={<Statistics />} />
        <Route path='/recover' exact element={<Recovery />} />
        <Route path='/profesor' exact element={<Layout categories={categoriesProfe}> <Profesor /> </Layout>} />
      </Routes>
    </>

    //   }
    //</div>




  );


}

export default App;
