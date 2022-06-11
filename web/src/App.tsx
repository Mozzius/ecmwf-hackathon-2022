import useSWR from "swr";

import "./App.css";

type Observation = {
  id: string;
  time: string;
  u10: string;
  v10: string;
};

function App() {
  const { data, error } = useSWR<Observation[]>("/api/data");

  if (error) return <p>Failed to load</p>;

  if (!data) return <p>Loading...</p>;

  return <div className="container"></div>;
}

export default App;
