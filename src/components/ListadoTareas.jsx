import useAuth from "../hooks/useAuth"
import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea"
const ListadoTareas = () => {
   const {tareas} = useTareas()
  
  return (
   <>
   {tareas?.length ? (
    <>
    <div className="Tarea__contenedor">
    {tareas.map(tarea =>(<Tarea key={tarea._id} tarea ={tarea}/>))}
    </div>
    
    </>
   ) : <h2 className="Tarea__contenedor--noTareas">Aun No Hay <span>Tareas</span></h2>}
   </>
  )
}

export default ListadoTareas