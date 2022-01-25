import { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {

  //* Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  //* State para Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //* Extraer nombre de proyecto
  const { nombre } = proyecto;

  //* Lee valor del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //* Cuando el usuario envia un proyecto
  const onSubmit = (e) => {
    e.preventDefault();

    //* Validar el proyecto
    if (nombre === '') {
      mostrarError();
      return;
    }
    //* agregar el state
    agregarProyecto(proyecto);

    //* reiniciar el form
    guardarProyecto({
      nombre:''
    });
  };

  //* Mostrar formulario
  const onClickForm = () => {
    mostrarFormulario();
  }

  return (
    <Fragment>
      <button 
        type="button"
        className="btn btn-block 
        btn-primario"
        onClick={onClickForm}
      >Nuevo Proyecto</button>

      {formulario
        ? (
          <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
            <input
              type="text"
              className="input-text"
              placeholder="Nombre Proyecto"
              name="nombre"
              onChange={onChangeProyecto}
              value={nombre}
            />

            <input
              type="submit"
              className="btn btn-block btn-primario"
              value="Agregar Proyecto"
            />
          </form>
        ) : null }

      { errorFormulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null }
    </Fragment>
  );
};

export default NuevoProyecto;
