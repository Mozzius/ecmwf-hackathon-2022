import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import "./WindHistory.css";

const storms = {
  0: {
    name: "This interactive experiment shows the wind history of Reading",
    info: "Scroll right to explore the various storms that have affected Reading over the past decades.",
  },
  44: {
    name: "The North Sea Flood of 1953",
    info: "One of the worst peacetime disasters of the 20th century that caused catastrophic damage and loss of life in Scotland, England, Belgium and The Netherlands",
  },
  840: {
    name: "Storm Brendan",
    info: "Storm Brendan was a deep Atlantic low-pressure system that brought strong winds and heavy rain to the UK and Ireland on 13 January 2020.  Named by Met Eireann, it was the second named storm of the 2019/2020 season.",
  },
  769: {
    name: "2013/2014 Winter Storms",
    info: "The UK experienced a spell of extreme weather from late January to mid-February as a succession of major storms brought widespread impacts and damage to the UK. Around 6 major storms hit through this period, causing widespread flooding.",
  },
  743: {
    name: "Early winter storms, late 2011",
    info: "On 8 December 2011, a deep Atlantic low pressure system brought very strong winds across the northern half of the UK.",
  },
  718: {
    name: "The Big Freeze of 2010",
    info: "European windstorms bringing heavy rain and gale-force winds caused damage and flooding to the south of Great Britain on 13–14 November. November was the wettest month across the United Kingdom since records began in 1914",
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
      if (nearestObservation)
        setDate(format(new Date(nearestObservation.time), "MMMM, yyyy"));
    };
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, [width, observations]);

  if (error) return <p>Failed to load</p>;

  if (!observations) return <p>Loading...</p>;

  return (
    <div className="wind-history" ref={ref}>
      <div className="observations">
        {observations.map((obs) => {
          const [x, y] = [parseInt(obs.u10), parseInt(obs.v10)];
          return (
            <div
              key={obs.id}
              className="observation"
              data-date={format(new Date(obs.time), "MMMM, yyyy")}
              data-id={obs.id}
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
      <div className="place">Location: Reading</div>
      <div className="date">{date}</div>
    </div>
  );
}

export default WindHistory;
