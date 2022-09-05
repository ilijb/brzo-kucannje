import React from 'react';
import './Application.sass'; 
import { Routes, Route} from 'react-router-dom';
import Menu from './Application/Menu/Menu';
import KucanjeApp from './KucanjeApp/KucanjeApp';
import Login from './User/Login/Login';
import UserRegisterPage from './User/Registration/UserRegisterPage';

function Application() {
  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/register' element={<UserRegisterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app'  element={<KucanjeApp />} />
        <Route path='/' element = {<div>Asd</div>} />
      </Routes>
    </>
  );
}

export default Application;
