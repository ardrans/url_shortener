import React, { useState } from 'react';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const[loggedIn, setLoggedIn] = useState(false);

    const { username, password } = formData;

    const history = useNavigate();

    const storeToken = (token) => {
      localStorage.setItem('token', token);
      //history('/');
      setLoggedIn(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://127.0.0.1:8000/api/login/', formData)
          .then((response) => {
            console.log('Login successful:', response.data);
            storeToken(response.data.token);
            
          })
          .catch((error) => {
            console.error('Login failed:', error.response.data);
            
          });
      };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    return(
       
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="container mt-5">
        <div className="App">

        {loggedIn ? (
           <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <Card border="success" style={{width: "600px", perspective:"1000px", height:"300px"}}>
                <nav>
                    <Card.Header>Welcome</Card.Header>
                    <Card.Link>
                        <Link to="/create-url-id">Go to Url Shortener</Link>
                        <Link to="/logout">Logout</Link>

                    </Card.Link>
                </nav>
            </Card>
            </div>
        ) : (
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="container mt-5">
            <div className="App">
            <Card bg="info" style={{width: "500px", perspective:"1000px"}}>
            <Card.Header>
          <h2 className="text-center">Login</h2>
         </Card.Header>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
            </div>
            <div className="mb-3">
            <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
            </div>
            <Card.Footer style={{display: 'flex', justifyContent:'flex-end'}}>
            <button type="submit" className="btn btn-primary">Login</button>
            </Card.Footer>
          </form>
          </Card>
           </div>
          </div>
          </div>
        )}
          </div>
          </div>
        </div>
    );

};



export default Login;
