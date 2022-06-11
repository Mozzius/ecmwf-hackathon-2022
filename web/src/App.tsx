import { format } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

import "./App.css";

type Observation = {
  id: string;
  time: number;
  u10: string;
  v10: string;
};

function App() {
  const { data: observations, error } = useSWR<Observation[]>("/api/data");
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef<HTMLDivElement>(null!);
  const [date, setDate] = useState<string>("");

  const sortedObservations = useMemo(() => {
    if (!observations) return [];
    return observations.sort((a, b) => a.time - b.time);
  }, [observations]);

  // set the width on resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // handle the onscroll event of the observation div
  useEffect(() => {
    const current = ref.current;
    const handleScroll = () => {
      const { scrollLeft } = current;
      const { width: totalWidth } = current.getBoundingClientRect();
      const percent = scrollLeft / totalWidth;
      const nearest = Math.floor(percent * sortedObservations.length);
      const nearestObservation = sortedObservations[nearest];
      if (nearestObservation)
        setDate(format(new Date(nearestObservation.time), "MMM, yyyy"));
    };
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, [width, sortedObservations]);

  if (error) return <p>Failed to load</p>;

  if (!observations) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="observations" ref={ref}>
        {sortedObservations.map((ob) => {
          const [x, y] = [parseInt(ob.u10), parseInt(ob.v10)];
          return (
            <div
              key={ob.id}
              style={{
                transform: `rotate(${Math.atan2(y, x)}rad) scale(${Math.sqrt(
                  y ** 2 * x ** 2
                )})`,
              }}
            >
              |
            </div>
          );
        })}
      </div>
      <div className="date">{date}</div>
    </div>
  );
}

export default App;
