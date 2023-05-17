import React, { useState } from "react";
import './App.css'
import Login from './pages/login-register/Login';
//import { Navbar } from "./bars/Navbar";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Profile from "./pages/profile";
import Statistics from "./pages/statistics";
import { Layout } from "./components";
import Home from "./pages/Home";
import Profesor from "./pages/Profesor";
import Recovery from "./pages/login-register/recoverpass.jsx"
import { AuthContext } from 'utils/AuthContext';


function App() {
  // const [currentForm, setCurrentForm] = useState('login')//useState('page') or useState('login')

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  function getAuth() {
    return localStorage.getItem('jwt')
  }
  const categories = [{ name: "Matricular", slug: "matricula" }, { name: "Tabulados", slug: "tabulados" }, { name: "Perfil", slug: "profile" }]
  const categoriesProfe = [{ name: "Perfil", slug: "profile" }]
  const [value, setValue] = useState()
  const isAuthenticated = localStorage.getItem('jwt');
  function getAuth() {
    return localStorage.getItem('jwt')
  }
  return (

    // <div className = {(currentForm === 'login') ? 'App-login' : 'App-page'}>
    //   {
    //     // currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
    <>
      {/* <Navbar /> */}
      <AuthContext.Provider value={{ value, setValue }}>
        <Routes>
          <Route path='/' exact element={
            (value || getAuth()) ? <Layout categories={categories}> <Home /> </Layout> : <Login />
          } />
          <Route path='/home' exact element={
            (value || getAuth()) ? <Layout categories={categories}> <Home /> </Layout> : <Navigate to="/" />}
          />
          <Route path='/profile' exact element={
            (value || getAuth()) ? <Profile /> : <Navigate to="/" />}
          />
          <Route path='/recover' exact element={<Recovery />} />
          <Route path='/profesor' exact element={
            (value || getAuth()) ? <Layout categories={categoriesProfe}> <Profesor /> </Layout> : <Navigate to="/" />}
          />
        </Routes>
      </AuthContext.Provider>
    </>

    //   }
    //</div>




  );


}

export default App;
