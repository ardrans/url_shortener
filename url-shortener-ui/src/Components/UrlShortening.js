import React, { useState } from 'react';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const UrlShortening = () => {
  const [url, setUrl] = useState('');
  const [createdUrlId, setCreatedUrlId] = useState('');
  const[isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateUrlId = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            setIsModalOpen(true);
        }

        const config = {
         headers: {
            Authorization: `Token ${token}`
            
        }
        };
    
        const response = await axios.post('http://127.0.0.1:8000/api/create_url_id/', { url }, config);
        setCreatedUrlId(response.data.complete_url);
        } catch (error) {
        console.error('Error creating URL:', error);
        }
    };

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
    <Card border="success" style={{width: "600px", perspective:"1000px", height:"300px"}}>
        <Card.Header>
      <h2 className="text-center">URL Shortener</h2>
      </Card.Header>
      <Card.Body>
      <Form>
        <Form.Group controlId="url">
          <Form.Label>Enter URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Card.Link>
            <Link to="/logout">Logout</Link>
            </Card.Link>
        <Card.Footer>
        <Button variant="primary" onClick={handleCreateUrlId}>
          Create Short URL
        </Button>
        </Card.Footer>
      </Form>
      </Card.Body>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Invalid User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please login First</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {createdUrlId && (
        <div>
            <Card border="success" style={{width: "600px", perspective:"1000px", height:"300px"}}>
          <p>Short URL created:</p>
          <a href={createdUrlId} target="_blank" rel="noopener noreferrer">
            {createdUrlId}
          </a>
          </Card>
        </div>
      )}
      </Card>
    </div>
  );
};

export default UrlShortening;
