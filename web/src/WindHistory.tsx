import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

import observations from "./data.json";

import "./WindHistory.css";

const storms = {
  0: {
    name: "This interactive experiment shows the wind history of Reading",
    info: `Scroll right to explore the various storms that have affected Reading over the past decades.
  These lines show the wind direction and magnitude of each month.
  Unfortunately, details about some of the historical wind events is patchy, especially futher back in time.
  Futher work would be needed to find more data about the historical events.`,
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
  481: {
    name: "Towyn Floods",
    info: `The coincidence on the 26th and 27th of strong winds, low atmospheric pressure and ‘spring’ tides led to severe flooding and waves damage along several British coasts. Towyn, Clwyd suffered a major disaster when sea defences were overwhelmed.
    Gales affected all areas across the UK and gusts in excess of 70 mph were very common.`,
  },
  516: {
    name: "The Braer Storm",
    info: `High tides and gales caused serious flooding and the death of a canoeist in the Strathclyde Region of Scotland.
    Wintry showers were widespread across Northern Ireland and Scotland bringing down power cables in the Lothian Region.`,
  },
  683: {
    name: "Winter Storms 2006",
    info: "High winds were recorded across the UK and Ireland.",
  },
  565: {
    name: "Winter Storms 1997",
    info: "A very snowy winter lead to blizzard conditions in the UK and Ireland.",
  },
  865: {
    name: "Storm Eunice",
    info: `February 2022 saw an intense extratropical cyclone cause huge disruption and damage across the UK and Europe. A red weather warning was issued on 17 February for parts of South West England and South Wales, with a second red warning issued on 18 February, the day the storm struck, for London, the South East and East of England.
    Eunice set a new record for the fastest wind gust recorded in England with 122 miles per hour (196 km/h) at The Needles, Isle of Wight. The storm was one of the most powerful to impact the south coast of England since the Great Storm of 1987.`,
  },
};

function WindHistory() {
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef<HTMLDivElement>(null!);
  const [date, setDate] = useState<string>(
    format(new Date(observations[0].time), "MMMM, yyyy")
  );

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
  }, [width]);

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
      {/* <div className="place">Location: Reading</div> */}
      <div className="date">{date}</div>
    </div>
  );
}

export default WindHistory;
