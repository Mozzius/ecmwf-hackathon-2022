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
          <LinkContainer to="/data">
            <Nav.Link className="linkles">Data</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wind-history" element={<WindHistory />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
