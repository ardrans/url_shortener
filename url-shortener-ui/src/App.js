import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Signup from './Components/Signup';
import Login from './Components/Login';
import UrlShortening from './Components/UrlShortening';
import Logout from './Components/Logout';
import DashBoard from './Components/DashBoard';

const App = () => {

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
   <div>
    <Container>
      <Router>
        <div class="row justify-content-center">
          <h1 class="text-center">Welcome to URL-Shortener-App</h1>
          <nav>
          <ul><Link to="/">Login</Link></ul>
            <Routes>
            {isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}
              <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<Login />}/>
              <Route path="/url-shortening" element={<UrlShortening />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/dashboard" element={<DashBoard />}/>
            </Routes>
            </nav>
        </div>
      </Router>
    </Container>
   </div>
  );
};

export default App;