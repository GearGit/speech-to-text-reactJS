import React from 'react';
import './App.scss';
import SpeechToTextDemo from './components/SpeechToTextDemo';
import { Container, Card } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";

function App() {
  return (
    <Container fluid className="main-content-container px-5 mt-5 mb-5">
      <SpeechToTextDemo/>
    </Container>
  );
}

export default App;
