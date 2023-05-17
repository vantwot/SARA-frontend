import './App.css'
import Login from './login-register/Login';
//import { Navbar } from "./bars/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/profile";
import Statistics from "./pages/statistics";
import { Home, Layout } from "./components";
import Profesor from './components/Profesor.jsx'
import Recovery from "./login-register/recoverpass.jsx"
import React, { useEffect, useState } from 'react';
import checkTokenInDjango from 'utils/utils';
import { AuthContext } from 'utils/AuthContext';

function App() {
  const [login_token, setValue] = useState()//se usa mas que todo para el primer login, value = jwt_token
  const [is_valid_token_in_lc, setAuth] = useState()//hay un bug, pero sirve para chequear la validez del token en localstorage
  useEffect(() => {//hay un bug, pero sirve para chequear la validez del token en localstorage
    const checkToken = async () => {
      try {
        const boolean = await checkTokenInDjango();
        setAuth(boolean);
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [is_valid_token_in_lc]);
  function getAuth() {
    return localStorage.getItem('jwt')
  }
  const categories = [{ name: "Matricular", slug: "matricula" }, { name: "Tabulados", slug: "tabulados" }, { name: "Perfil", slug: "profile" }]
  const categoriesProfe = [{ name: "Perfil", slug: "profile" }]
  return (

    <>
      <AuthContext.Provider value={{ login_token, setValue }}>
        <Routes>
          <Route path='/' exact element={
            (login_token || is_valid_token_in_lc) ? <Layout categories={categories}> <Home /> </Layout> : <Login />
          } />
          <Route path='/home' exact element={
            (login_token || is_valid_token_in_lc) ? <Layout categories={categories}> <Home /> </Layout> : <Navigate to="/" />
          } />
          <Route path='/profile' exact element={
            //<PrivateRoute>
            <Profile />
            //</PrivateRoute>
          } />
          <Route path='/statistics' exact element={
            <Statistics />
          } />
          <Route path='/recover' exact element={
            <Recovery />
          } />
          <Route path='/profesor' exact element={
            //<PrivateRoute>
            <Layout categories={categoriesProfe}> <Profesor /> </Layout>
            //</PrivateRoute>
          } />
        </Routes >
      </AuthContext.Provider>
    </>

  );


}

export default App;
