import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import FromApi from './pages/FromApi/ApiReturn';

function App() {

  return (
    <>
      <Router >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/api-return' element={<FromApi/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
