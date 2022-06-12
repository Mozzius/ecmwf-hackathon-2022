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
        Visualising Data by Earth, Wind and Graphs (Without any boring graphs)
      </h2>
      <div className="central">
        <ul>
          <li>
            Stuart - Parselmouth{" "}
            <img src="/py.png" className="logo" alt="python" />
          </li>
          <li>
            Samuel - React Senior{" "}
            <img src="/reactionary.png" className="logo" alt="react" />
          </li>
          <li>
            Stephen - RStudio Render{" "}
            <img src="/arrr.png" className="logo" alt="r studio" />
          </li>
          <li>
            Karius - Vector Fan{" "}
            <img src="/matlab.png" className="logo" alt="matlab" />
          </li>
          <li>
            Finbar - Moral Support / React Junior{" "}
            <img src="/reactionary.png" className="logo" alt="react" />
          </li>
        </ul>
        <p> Our goal was to visualise Wind data in a simple, readable form.</p>
      </div>
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

function Disasters() {
  return (
    <div className="disasters">
      <div>
        <p>All Disasters</p>
        <img src="/ALL_NAT_DIS.svg" alt="disasters" />
      </div>
      <div>
        <p>Extreme Weather</p>
        <img src="/extreme_weather.svg" alt="extreme weather" />
      </div>
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
        <Nav.Item>
          <LinkContainer to="/disasters">
            <Nav.Link className="linkles">Disasters</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wind-history" element={<WindHistory />} />
        <Route path="/vectors" element={<Vectors />} />
        <Route path="/disasters" element={<Disasters />} />
      </Routes>
    </div>
  );
}

export default App;
