import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import "./WindHistory.css";

const storms = {
  840: {
    name: "Storm Brendan",
    info: `Storm Brendan was a deep Atlantic low-pressure system that brought strong winds and heavy rain to the UK and Ireland on 13 January 2020.  Named by Met Eireann, it was the second named storm of the 2019/2020 season. 

    The Met Office issued a yellow wind warning for north-western parts of the UK where winds were strongest, with gusts reaching over 100mph across Scotland’s mountain summits.  The strong winds were accompanied by heavy rain across the UK, particularly across western England, Wales and western Scotland where 50mm of more rain fell.
    
    Strong winds caused delays or cancellations to ferry services in western Scotland, as well as several flight diversions across the UK during Monday evening.  In Northern Ireland and Wales, thousands of home lost power and some roads were shut due to fallen trees.`,
  },
};

type Observation = {
  id: number;
  time: number;
  u10: string;
  v10: string;
};

function WindHistory() {
  const { data: observations, error } = useSWR<Observation[]>("/api/data");
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef<HTMLDivElement>(null!);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (observations)
      setDate(format(new Date(observations[0].time), "MMMM, yyyy"));
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
    if (!current || !observations) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      const percent = scrollLeft / (scrollWidth - clientWidth);
      const nearest = Math.floor(percent * (observations.length - 1));
      const nearestObservation = observations[nearest];
      console.log(
        nearestObservation.id,
        format(new Date(nearestObservation.time), "MMMM, yyyy")
      );
      if (nearestObservation)
        setDate(format(new Date(nearestObservation.time), "MMMM, yyyy"));
    };
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, [width, observations]);

  if (error) return <p>Failed to load</p>;

  if (!observations) return <p>Loading...</p>;

  return (
    <div className="container" ref={ref}>
      <div className="observations">
        {observations.map((obs) => {
          const [x, y] = [parseInt(obs.u10), parseInt(obs.v10)];
          return (
            <div
              key={obs.id}
              className="observation"
              data-year={format(new Date(obs.time), "MMMM, yyyy")}
            >
              {obs.id in storms && (
                <div className="storm">
                  <h1>{storms[obs.id as keyof typeof storms].name}</h1>
                  {storms[obs.id as keyof typeof storms].info
                    .split("\n")
                    .map((line, i) => (
                      <p key={i}>{line.trim()}</p>
                    ))}
                </div>
              )}
              <div
                className="wind"
                style={{
                  transform: `rotate(${Math.atan2(y, x)}rad) scale(${Math.sqrt(
                    y ** 2 * x ** 2
                  )})`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="date">{date}</div>
    </div>
  );
}

export default WindHistory;
