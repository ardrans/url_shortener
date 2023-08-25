import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Logout = () => {
  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/logout/', null, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        console.log('Logout successful:', response.data);
    
    })
    .catch(error => {
        console.error('Logout failed:', error.response.data);
    });
  };

  return (
    <Button variant="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
