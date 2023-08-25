import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Signup from './Components/Signup';
import Login from './Components/Login';
import CreateUrlId from './Components/CreateUrlId';

const App = () => {
  return (
   <div>
    <Container>
      <Router>
        <div class="row justify-content-center">
          <h1 class="text-center">Welcome to URL-Shortener-App</h1>
          <nav>
            <ul><Link to="/signup">Signup</Link></ul>
            <Routes>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/Create-url-id" element={<CreateUrlId />}/>
            </Routes>
          </nav>
        </div>
      </Router>
    </Container>
   </div>
  );
};

export default App;