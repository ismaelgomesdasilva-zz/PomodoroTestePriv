import React, { useState, useEffect } from "react";
import { GrPlay } from "react-icons/gr";
import useSound from "use-sound";
import { ImPause } from "react-icons/im";
import { Link, useHistory } from "react-router-dom";
import LocationFacility from "../facilitys/locationFacility";
import "./time.css";
import Bell from "../Sounds/bell.mp3";


export default function Time() {
  // recebe valores pelo params
  const query = LocationFacility.GetParams();
  const minutesTimeWork = query.get("minutes");
  const minutesTimeBreak = query.get("rest");
  const repeatSession = query.get("session");
  // recebe valores pelo params
  const [_Bell] = useSound(Bell);

  //contador work
  const [pause, setPause] = useState(true);
  const [secondsAmout, setSecondsAmout] = useState(minutesTimeWork * 60);
  const MinutesCounter = Math.floor(secondsAmout / 60);
  const seconds = secondsAmout % 60;
  //contador work

  //contador rest
  const [pauseAmout, setPauseAmout] = useState(minutesTimeBreak * 60);
  const breakTime = Math.floor(pauseAmout / 60);
  const secondsbreakTime = pauseAmout % 60;
  const [finishedTimeout, setFinishedTimeout] = useState(false);
  const [sessionsLoop, setSessionsLoop] = useState(0);
  //contador rest

  //Hide
  const [hideCondicional, setHideCondicional] = useState(true);
  //Hide
  const [sound, setSound] = useState(false)
  const history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause && sessionsLoop <= repeatSession) {
        if (secondsAmout > 0) {
          setSecondsAmout(secondsAmout - 1);
        
        }
        else {
          setHideCondicional(false);
          if(sound === false){
            setSound(true) 
            _Bell()
          }
          const id = setTimeout(() => {
            setFinishedTimeout(true);
          }, 1000);

          if (pauseAmout > 0) {
            setPauseAmout(pauseAmout - 1);

            return () => clearTimeout(id);
          }
          
          if (pauseAmout === 0) {
            _Bell();
            setPause(true);
            setSecondsAmout(minutesTimeWork * 60);
            setPauseAmout(minutesTimeBreak * 60);
            setSessionsLoop((prevState) => prevState + 1);
            setHideCondicional(true);
            setSound(false) 
            return;
          }
        }
      }
    }, 1000);
    if (sessionsLoop >= repeatSession) {
     
      history.push("/");
    }

    return () => clearInterval(interval);
  });

  const handlePauseToggle = () => {
    setPause(!pause);
  };

  function renderSession() {
    const componentList = [];

    for (let i = 0; i < repeatSession; i++)
      if (i <= sessionsLoop) {
        {
          componentList.push(<div className="reticencias" />);
        }
      } else {
        {
          componentList.push(<div className="re-cinza" />);
        }
      }
    return componentList;
  }

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
      {hideCondicional ? (
        <div className="container">
          <div className="Neumor">
            <div
              className={pause ? "Neumor-Green-nopulse" : "Neumor-Green"}
            ></div>

            <p>{String(MinutesCounter).padStart(2, "0")}</p>
            <p>:</p>
            <p>{String(seconds).padStart(2, "0")}</p>
          </div>
          <div className="status">
            <h3>Trabalho</h3>

            <div className="reticencias ">{renderSession()}</div>
            <button
              onClick={() => {
                handlePauseToggle();
              }}
              className="button-time"
            >
              {pause ? <GrPlay /> : <ImPause />}
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="Neumor">
            <div
              className={pause ? "Neumor-orange-nopulse" : "Neumor-orange"}
            ></div>
            <p>{String(breakTime).padStart(2, "0")}</p>
            <p>:</p>
            <p>{String(secondsbreakTime).padStart(2, "0")}</p>
          </div>
          <div className="status">
            <h3 className="h3orange">Pausa</h3>
            <div className="reticenciasOrage ">{renderSession()}</div>
            <button onClick={() => handlePauseToggle()} className="button-time">
              {pause || breakTime < 0 ? <GrPlay /> : <ImPause />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
