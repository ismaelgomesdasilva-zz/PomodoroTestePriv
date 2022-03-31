import React from "react";
import { useState, useEffect } from "react";
import "./time.css";
import { GrPlay } from "react-icons/gr";
import { ImPause } from "react-icons/im";
import { Link } from "react-router-dom";
import LocationFacility from "../facilitys/locationFacility";

export default function Time() {
  const query = LocationFacility.GetParams();
  const minutes = query.get("minutes");
  const rest = query.get("rest");
  const session = query.get("session");
  //contador work
  const [pause, setPause] = useState(true);
  const Countdown_Initial_time_in_seconds = minutes * 60;
  const [secondsAmout, setSecondsAmout] = useState(
    Countdown_Initial_time_in_seconds
  );
  const minutesTime = Math.floor(secondsAmout / 60);
  const seconds = secondsAmout % 60;

  useEffect(() => {
    if (secondsAmout === 0) {
      alert("terminou o tempo porra");

      return;
    }
    if (!pause) {
      setTimeout(() => {
        setSecondsAmout((state) => state - 1);
      }, 1000);
    }
  }, [secondsAmout, pause]);

  //contador work

// contador break 
const Countdown_Break_time_in_seconds = rest * 60;
const [pauseAmout, setPauseAmout] = useState(
  Countdown_Break_time_in_seconds
);

const breakTime = Math.floor(pauseAmout / 60);
const secondsbreak = pauseAmout % 60;


                      //Hide
const [pauseBreak, setPauseBreak] = useState(false)
                      //Hide

// contador break 

  return (
    <div>
      <div className="header-time">
        <div>
          <h1>Pomodoro</h1>
        </div>
        <div>
          <Link to="/">
            <button>inicío</button>
          </Link>
        </div>
      </div>
     {pauseBreak?(
        <div className="container">
        <div className="Neumor">
          <div className="Neumor-Green"></div> 
          {/* .Neumor-orage */}
          <p>{String(minutesTime).padStart(2, "0")}</p>
          <p>:</p>
          <p>{String(seconds).padStart(2, "0")}</p>
        </div>
        <div className="status">
          <h3>Trabalho</h3>
          <div className="reticencias ">
            <div className="Bolinha1"></div>
            <div className="Bolinha2"></div>
            <div className="re-cinza"></div>
          </div>
          <button onClick={() => setPause(!pause)} className="button-time">
            {pause ? <GrPlay /> : <ImPause />}
          </button>
        </div>
      </div>
     ):(
      <div className="container">
      <div className="Neumor">
        <div className="Neumor-orange"></div> 
        {/* .Neumor-orage */}
        <p>{String(breakTime).padStart(2, "0")}</p>
        <p>:</p>
        <p>{String(secondsbreak).padStart(2, "0")}</p>
      </div>
      <div className="status">
        <h3 className="h3orange">Pausa</h3>
        <div className="reticenciasOrage ">
          <div className="Bolinha1"></div>
          <div className="Bolinha2"></div>
          <div className="re-cinza"></div>
        </div>
        <button onClick={() => setPause(!pause)} className="button-time">
          {pause ? <GrPlay /> : <ImPause />}
        </button>
      </div>
    </div>
     )}
    </div>
  );
}
