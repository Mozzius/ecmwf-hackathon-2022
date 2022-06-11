import useSWR from "swr";
import classes from "./App.module.css";

function App() {
  const { data, error } = useSWR("/api/data");

  if (error) console.error(error);

  return (
    <div>
      <h1>Should say hello world:</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
