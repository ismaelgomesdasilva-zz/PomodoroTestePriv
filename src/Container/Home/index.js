import React, { useState } from "react";
import "./home.css";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Home() {
  const [minutesWork, setMinutesWork] = useState(25);
  const [minutesRest, setMinutesRest] = useState(5);
  const [sessionLoop, setSessionLoop] = useState(3);
  return (
    <div className="container-principal">
      <h1>Pomodoro</h1>
      <div className="container-secundario">
        <div className="Div-Conteudo">
          <div className="icons">
            <FaArrowAltCircleUp
              onClick={() => setMinutesWork(minutesWork + 1)}
            />
            <FaArrowAltCircleDown
              onClick={() => {
                if (minutesWork > 1) {
                  setMinutesWork(minutesWork - 1);
                }
              }}
            />
          </div>
          <div>
            <span>{minutesWork}</span>
            <p>Trabalho</p>
          </div>
        </div>
        <div className="Div-Conteudo">
          <div className="icons">
            <FaArrowAltCircleUp
              onClick={() => setMinutesRest(minutesRest + 1)}
            />
            <FaArrowAltCircleDown
              onClick={() => {
                if (minutesRest > 1) {
                  setMinutesRest(minutesRest - 1);
                }
              }}
            />
          </div>
          <div>
            <span>{minutesRest}</span>
            <p>Pausa</p>
          </div>
        </div>
        <div className="Div-Conteudo">
          <div className="icons">
            <FaArrowAltCircleUp
              onClick={() => setSessionLoop(sessionLoop + 1)}
            />
            <FaArrowAltCircleDown
              onClick={() => {
                if (sessionLoop > 1) {
                  setSessionLoop(sessionLoop - 1);
                }
              }}
            />
          </div>
          <div>
            <span>{sessionLoop}</span>
            <p>Sessões</p>
          </div>
        </div>
      </div>
      <Link
        to={`/time/?minutes=${minutesWork}&rest=${minutesRest}&session=${sessionLoop} `}
      >
        <button className="continuar">Continuar </button>
      </Link>
    </div>
  );
}
