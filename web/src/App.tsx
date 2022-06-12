import { useState } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes, Route } from "react-router-dom";

import WindHistory from "./WindHistory";

function Home() {
  return (
    <div>
      <h1>ECMWF Hackathon</h1>
      <h2>
        Visualising Wind Data by Earth, Wind and Graphs (Without any boring
        graphs)
      </h2>
      <p>import data</p>
    </div>
  );
}

function Data() {
  return (
    <div>
      <h1>Data</h1>
    </div>
  );
}

function Vectors() {
  const [vid, setVid] = useState<"vid1" | "vid2">("vid1");

  return (
    <div>
      <button onClick={() => setVid("vid1")}>Video 1</button>
      <button onClick={() => setVid("vid2")}>Video 2</button>
      <video width="100%" height="auto" loop autoPlay src={`/${vid}.webm`} />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Nav fill variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link className="linkles">Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/wind-history">
            <Nav.Link className="linkles">Wind History</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/vectors">
            <Nav.Link className="linkles">Vectors</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wind-history" element={<WindHistory />} />
        <Route path="/vectors" element={<Vectors />} />
      </Routes>
    </div>
  );
}

export default App;
