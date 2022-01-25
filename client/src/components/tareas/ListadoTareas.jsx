import { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    //* Extraer proyecto de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //* Extraer tareas de context
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    //! Si no hay proyecto seleccionado
    if( !proyecto ) return <h2>Selecciona un proyecto</h2>;
  
    //* Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    //! Elimina un proyecto
    const onClickEliminar = () => {
      eliminarProyecto( proyectoActual._id );
    }

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
          {tareasProyecto.length === 0 
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            : 
            <TransitionGroup>
            {tareasProyecto.map( tarea => (
                <CSSTransition
                    key={tarea._id}
                    timeout={300}
                    classNames="tarea"
                >
                  <Tarea
                      key={tarea.id}
                      tarea={tarea}
                  />
                </CSSTransition>
            ))}
            </TransitionGroup>
          }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={ onClickEliminar }
      >Eliminar Proyecto &times;</button>
    </Fragment>
  );
};

export default ListadoTareas;
