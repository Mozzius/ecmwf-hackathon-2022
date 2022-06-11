import useSWR from "swr";
import classes from "./App.module.css";

function App() {
  const { data } = useSWR("/api/hello");
  return (
    <div>
      <h1>Should say hello world:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
