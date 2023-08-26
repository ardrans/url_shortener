import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function ListUrls() {
  const [urls, setUrls] = useState([]);
  
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list_urls/');
        setUrls(response.data); 
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);

  

  return (
    <div>
        <Card>
      <h1 class="text-center">URLs</h1>
      <Card.Body>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            <a href={url.url}>{url.url_id}</a>
          </li>
        ))}
      </ul>
      </Card.Body>
      <Card.Footer>
      <Card.Link>
      <Link to="/url-shortening">Create shorten URL</Link>
      </Card.Link>
      </Card.Footer>
      </Card>
    </div>
  );
}

export default ListUrls;
