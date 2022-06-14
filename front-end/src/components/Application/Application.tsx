import React from 'react';
import './Application.sass'; 
import {Button, Container} from 'react-bootstrap';
import Login from '../User/Login/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Menu/Menu';
import KucanjeApp from '../KucanjeApp/KucanjeApp';

function Application() {
  return (
    <Container className='mt-4'>
      <Menu/>
      <BrowserRouter >
        <Routes >
          <Route path='/' element = {<div>Asd</div>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/app' element={<KucanjeApp/>}/>
        </Routes>
      </BrowserRouter>

    </Container>
  );
}

export default Application;
