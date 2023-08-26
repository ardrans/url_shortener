
import React, { useState } from 'react';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const { name, password, confirmPassword, email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    const user = {
      name: name,
      password: password,
      email: email,
    };
  
    axios
      .post('http://127.0.0.1:8000/api/register/', user)
      .then((response) => {
        console.log('Registration successful:', response.data);
        history('/login'); 
        
      })
      .catch((error) => {
        if (error.response.data.error === "Email already exists") {
          toast.error("Email already registered with us.");
      } else {
          console.error('Registration failed:', error.response.data);
      }
        console.error('Registration failed:', error.response.data);
        
      });
  };
  return (
    <div>
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <Card bg="info" style={{width: "500px", perspective:"1000px"}}>
       
        <div className="container mt-5">
        <Card.Header>
      <h2 className="text-center">Signup</h2>
     </Card.Header>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <Card.Footer style={{display: 'flex', justifyContent:'flex-end'}}>
        <button type="submit" className="btn btn-primary">Signup</button>
        </Card.Footer>
      </form>
       </div>
      </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
