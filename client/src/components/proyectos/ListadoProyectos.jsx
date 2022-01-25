import { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

  //* Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  //* Alerta Context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //* Obtener proyectos cuando carga el componente
  useEffect(() => {

    //! Si hay un error
    if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria)

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  //* Verificar si hay proyectos
  if (proyectos.length === 0) return <p>No hay proyectos, crea uno!</p>;

  return (
    <ul className="listado-proyectos">

      { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }

      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition 
            key={proyecto._id}
            timeout={300} 
            classNames="proyecto"
          >
            <Proyecto 
                proyecto={proyecto}   
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
