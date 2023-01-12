

export default function Alerta({alerta}) {
  return (
   <div>
        
        <h3 className={`${alerta?.error ? 'alerta-error' : 'alerta-exito'}`}>{alerta?.msg}</h3>
   </div>
  )
}

