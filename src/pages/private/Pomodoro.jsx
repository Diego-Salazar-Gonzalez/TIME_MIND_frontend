import { useState, useEffect, useRef } from "react";
import { Timer, Time, TimerOptions } from "timer-node";

import ImgPlay from "../../img/imgPlay.svg";
import ImgPause from "../../img/imgPause.svg";
import ImgSkip from "../../img/imgSkip.svg";
import ImgStop from "../../img/imgStop.svg";
import ImgFlama from "../../img/flama.svg";
import ImgFlamaFill from "../../img/flamaFill.svg";
import ImgAjustes from "../../img/imgAjustes.svg";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Pomodoro() {
  const timer = new Timer();
  const [tiempo,setTiempo] = useState(0)
  const[pause,setPause] = useState(false)
  

  useEffect(() => {
   
   
  }, [tiempo])
  
  const iniciarTemporizador = () =>{
    if(!timer.isStarted()){
        timer.start()
    }
  }

  const handlePlay = () => {
    iniciarTemporizador()
     let Interval = setInterval(() => {
     

       if(pause){
        clearInterval(Interval)
       }
     }, 1000);
     
   
  }
    

  const handlePause = () => {
    
    setPause(true)
    timer.pause()
  };

  const handleStop = () => {
   
  };

  return (
    <>
      <div className="pomodoro-header">
        <div>
          <h2>
            Hola: <span>Usuario</span>
          </h2>
        </div>
        <div className="flamas">
          <img src={ImgFlamaFill} alt="Imagen de flama" />
          <img src={ImgFlama} alt="Imagen de flama" />
          <img src={ImgFlama} alt="Imagen de flama" />
          <img src={ImgFlama} alt="Imagen de flama" />
        </div>
      </div>
      <div className="pomodoro__opciones">
        <img src={ImgAjustes} alt="Opciones" />
      </div>

      <div className="pomodoro">
        <div className="pomodoro__timer">
          <CircularProgressbar value={2} text={tiempo} />
        </div>

        <div className="pomodoro__botones">
          <div className="pomodoro__botones--play">
            <img src={ImgPlay} alt="boton de iniciar" onClick={handlePlay} />
          </div>

          <div className="pomodoro__botones--pause">
            <img src={ImgPause} alt="boton pause" onClick={handlePause} />
          </div>
          <div className="pomodoro__botones--skip">
            <img src={ImgSkip} alt="boton saltar" />
          </div>
          <div className="pomodoro__botones--stop">
            <img src={ImgStop} alt="boton parar" onClick={handleStop} />
          </div>
        </div>
      </div>
    </>
  );
}
