import { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {

  //* Extraer proyectoId
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //* Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //* Extraer eliminarTarea y obtenerTareas de tareasContext
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

  //* Func para eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id,proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  }

  //* Func para editar estado de una tarea
  const cambiarEstado = tarea => {
      if(tarea.estado) {
        tarea.estado = false;
      } else {
        tarea.estado = true;
      }

      actualizarTarea(tarea);
  }

  //* Func para editar tarea
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado 
            ? (
                <button
                  type="button"
                  className="completo"
                  onClick={()=> cambiarEstado(tarea)} 
                >
                    Completo
                </button>
            ) 
            : (
                <button
                  type="button" 
                  className="incompleto"
                  onClick={()=> cambiarEstado(tarea)}
                >
                    Incompleto
                </button>
            )
        }
      </div>

      <div className="acciones">
          <button
            type="button"
            className="btn btn-primario"
            onClick={()=> seleccionarTarea(tarea)}
          >Editar</button>

          <button
            type="button"
            className="btn btn-secundario"
            onClick={()=> tareaEliminar(tarea._id)}
          >Eliminar  </button>
      </div>
    </li>
  );
};

export default Tarea;
