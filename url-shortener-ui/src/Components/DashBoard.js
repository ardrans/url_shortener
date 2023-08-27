import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';


function DashBoard() {
  const [urls, setUrls] = useState([]);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
       Authorization: `Token ${token}`
       
   }
   };
  
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/list_urls/`, config);
        setUrls(response.data); 
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);
  

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <Card style={{width: "900px", perspective:"1000px"}}>
      <h1 class="text-center">Links</h1>
      <Card.Body>
      <table>
  <thead>
    <tr>
      <th style={{ textAlign: 'center', padding: '10px'}}>URL</th>
      <th style={{ textAlign: 'center', padding: '10px'}}>Shorten URL</th>
    </tr>
  </thead>
  <tbody>
    {urls.map((url) => (
      <tr key={url.id}>
        <td><a href={url.url}>{url.url}</a></td>
        <br></br>
        <td>{url.url_id}</td>
      </tr>
    ))}
  </tbody>
</table>
      </Card.Body>
      <Card.Footer>
      <Card.Link>
      <Link to="/url-shortening">Create shorten URL</Link>
      <br></br>
      <Link to="/logout">Logout</Link>
      </Card.Link>
      </Card.Footer>
      </Card>
    </div>
  );
}

export default DashBoard;
