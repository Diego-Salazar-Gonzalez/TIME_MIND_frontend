import { useState,useEffect,createContext } from "react"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"
const TareasContext = createContext()

const TareasProvider = ({children}) => {
    const [tareas,setTareas] = useState([])
    const [tarea,setTarea] = useState({})
    const data = useAuth()
    const {auth} = useAuth()
   
    
    useEffect(()=>{
        
        const obtenerTareas = async () =>{
            const token_TimeMind = localStorage.getItem('token_TimeMind')
        
            if(!token_TimeMind) return
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token_TimeMind}`
                }
            }

            try {
                const {data} = await clienteAxios('/tareas',config)
                
                setTareas(data)
                return
            } catch (error) {
               
                setTareas({})
                
            }
        }
        obtenerTareas()

    },[auth])

    const editarTarea = async (tarea) =>{
        const token_TimeMind = localStorage.getItem('token_TimeMind')
       
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token_TimeMind}`
            }
        }
        console.log(tarea)
        if(tarea.id){
            try {
               
                
                const {data} = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config)
                const tareasActualizada = tareas.map(
                    tarea => tarea._id === data._id ? data : tarea
                )
                setTareas(tareasActualizada)
               
            } catch (error) {
                console.log(error)
            }
        }else{

            try{
                
                const {data} = await clienteAxios.post('/tareas',tarea,config)
               
                const {__v, ...tareaAlmacenada} = data
                setTareas([tareaAlmacenada,...tareas])
                
            }catch(error){
                console.log(error)
            }
        }
    }

    const eliminarTarea = async (id) =>{
        const token_TimeMind = localStorage.getItem('token_TimeMind')
        
            if(!token_TimeMind) return
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token_TimeMind}`
                }
            }

            try {
                await clienteAxios.delete(`/tareas/${id}`,config)
                const TareasActualizadas = tareas.filter(tareaState => tareaState._id !== id)
                setTareas(TareasActualizadas)
                
            } catch (error) {
                
            } 
    }
    const Editar = tareaSeleccionada =>{
        setTarea(tareaSeleccionada)
    }
  

  return (
    <TareasContext.Provider
    value={{tareas,editarTarea,eliminarTarea,tarea,Editar,setTareas}}
    >{children}</TareasContext.Provider>
  )
}
export{
    TareasProvider
}


export default TareasContext