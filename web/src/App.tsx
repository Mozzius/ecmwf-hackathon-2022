import { Nav } from "react-bootstrap";

<<<<<<< Updated upstream
function Menu({ title }: any) {
  return <nav>{title}</nav>;
=======
import WindHistory from "./WindHistory";

function Home() {
  return (
    <div>
      <h1>ECMWF Hackathon</h1>
      <h2>
        Visualising Data by Earth, Wind and Graphs (Without any boring
        graphs)
      </h2>
      <div className="central">
      <ul>
        <li>Stuart - Parselmouth <img src="/py.png" className="logo"/> </li>
        <li>Samuel - React Senior <img src="/reactionary.png" className="logo"/> </li>
        <li>Stephen - RStudio Render <img src="/arrr.png" className="logo"/></li>
        <li>Karius - Vector Fan <img src="/matlab.png" className="logo"/></li>
        <li>Finbar - Moral Support / React Junior <img src="/reactionary.png" className="logo"/></li>
      </ul>
      <p> Our goal was to visualise Wind data in a simple, readable form.</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div>
      <h1>Data</h1>
    </div>
  );
>>>>>>> Stashed changes
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
