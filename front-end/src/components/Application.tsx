import React from 'react';
import './Application.sass'; 
import { Routes, Route} from 'react-router-dom';
import Menu from './Application/Menu/Menu';
import Login from './User/Login/Login';
import UserRegisterPage from './User/Registration/UserRegisterPage';
import Kategorija from './Kategorija/Kategorija';
import Tekstovi from './Tekstovi/Tekstovi';

function Application() {
  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/register' element={<UserRegisterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category/:id'  element={<Tekstovi />} />
        <Route path='/app'  element={<Kategorija />} />
        <Route path='/' element = {<div>Asd</div>} />
      </Routes>
    </>
  );
}

export default Application;
