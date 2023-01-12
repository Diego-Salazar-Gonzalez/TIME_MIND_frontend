import { useState,useEffect } from "react";
import Alerta from "./Alerta";
import imgEquis from "../img/imgEquis.svg";
import useTareas from "../hooks/useTareas";

export default function Modal({ animar,setModal,setAnimar }) {
  
  const [nombreTarea, setNombreTarea] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [alerta, setAlerta] = useState({});
  const [id,setId] = useState("")
  const {editarTarea,tarea,Editar} = useTareas()

  useEffect(() => {

    if(tarea?.nombre){
      
      setNombreTarea(tarea.nombre)
      setTiempo(parseInt(tarea.tiempo))
      setDescripcion(tarea.descripcion)
      setId(tarea._id)
      
    }

   

   
  
    
  }, [tarea])
  


  const handleModal = () =>{
   //cierra el modal y limpia el estado global de editar que contiene la informacion de la tarea
    setAnimar(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
     Editar('')
     
 
    
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombreTarea, descripcion].includes("") || tiempo === 0) {
      setAlerta({msg: 'Hay campos vacios',error: true});
      return;
    }
    setAlerta({})
    
   editarTarea({nombre:nombreTarea,tiempo,descripcion,id})

   setAlerta({msg: 'Tarea Guardada',error : false})
   //cierra el modal y limpia el estado global de editar que contiene la informacion de la tarea
   setAnimar(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
    Editar('')

    
  };

  const {msg} = alerta

  return (
    <div className="modal">
      <div className="modal__cerrar">
        <img src={imgEquis} alt="Cerrar-modal" onClick={handleModal} />
      </div>
      <div
        className={`modal__formulario ${
          animar ? "modal__formulario--animar" : ""
        }`}
      >
        <form onSubmit={handleSubmit}>
          {msg && <Alerta
          alerta={alerta}
          />}
          <div className="modal__formulario--tarea">
            <label htmlFor="">Tarea:</label>
            <input
              type="text"
              placeholder="Escribe el nombre de la tarea"
              defaultValue={nombreTarea}
              onChange={(e) => setNombreTarea(e.target.value)}
            />
          </div>

          <div className="modal__formulario--tiempo">
            <label htmlFor="">Tiempo:</label>
            <input
              type="number"
              placeholder="Duracion (en minutos)"
              value={tiempo}
              onChange={(e) => setTiempo(parseInt(e.target.value))}
            />
          </div>

          <div className="modal__formulario--descripcion">
            <label htmlFor="">Descripcion:</label>
            <textarea
              name=""
              id=""
              cols="10"
              rows="7"
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe tu tarea"
              defaultValue={descripcion}
            ></textarea>
          </div>
          <div className="modal__formulario--submit">
            <input type="submit" value="Guardar" />
          </div>
        </form>
      </div>
    </div>
  );
}
