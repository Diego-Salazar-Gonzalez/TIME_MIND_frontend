import { useContext } from "react";
import TareasContext from "../context/tareasProvider";

const useTareas = () =>{
    return useContext(TareasContext)
}
export default useTareas