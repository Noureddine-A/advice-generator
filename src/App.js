import React, { useState, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./App.css";
import Divider from "./assets/pattern-divider-desktop.svg";

function App() {
  const [advice, setAdvice] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  async function fetchAdvice() {
    setLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip);
    setLoading(false);
  }

  console.log(loading);

  return (
    <div className="app__container">
      <div className="advice__container">
        <SkeletonTheme baseColor="hsl(218, 23%, 16%)" highlightColor="#444">
          <p>ADVICE #{advice.id}</p>
          <div className="advice__content">
            {loading ? <Skeleton count={3} /> : <h1>{advice.advice}</h1>}
          </div>

          <img src={Divider} alt={Divider} />
          <div className="new__advice">
            <button onClick={fetchAdvice}></button>
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
