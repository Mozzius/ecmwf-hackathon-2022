import { Nav } from "react-bootstrap";

function Menu({ title }: any) {
  return <nav>{title}</nav>;
}

function App() {
  // const [clicked, setClicked] = useState(false)

  return (
    <div>
            <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home" className="linkles">Simple Model</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="linkles">Less Simple Model</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className="linkles">Not Simple Model</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" className="linkles">
            Complex Model
          </Nav.Link>
        </Nav.Item>
      </Nav> 
      <h1>ECMWF Hackathon</h1>
      <h2>
        Visualising Wind Data by Earth, Wind and Graphs (Without any boring
        graphs)
      </h2>
      <p>import data</p>
    </div>
  );
}

export default App;
