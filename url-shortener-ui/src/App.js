import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Signup from './Components/Signup';
import Login from './Components/Login';
import UrlShortening from './Components/UrlShortening';
import Logout from './Components/Logout';

const App = () => {
  return (
   <div>
    <Container>
      <Router>
        <div class="row justify-content-center">
          <h1 class="text-center">Welcome to URL-Shortener-App</h1>
          <nav>
          <ul><Link to="/">Login</Link></ul>
            <Routes>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<Login />}/>
              <Route path="/url-shortening" element={<UrlShortening />}/>
              <Route path="/logout" element={<Logout />}/>
            </Routes>
          </nav>
        </div>
      </Router>
    </Container>
   </div>
  );
};

export default App;