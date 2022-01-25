import { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //* Extraer proyecto de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //* Extraer agregarTarea de tareacontext
  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    tareaSeleccionada,
    obtenerTareas,
    agregarTarea,
    validarTarea,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  //* Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  //* state del formulario
  const [tarea, guardarTarea] = useState({
    id: null,
    nombre: "",
    estado: false,
    proyecto: null,
  });

  //* Si no hay proyecto seleccionado
  if (!proyecto) return null;

  //* Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //* Extraer nombre tarea
  const { nombre } = tarea;

  //* leer input
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();

    //* Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //* Si es edicion o nueva tarea
    if (tareaSeleccionada === null) {
      //* tarea nueva

      //* agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      tarea.estado = false;
      agregarTarea(tarea);

    } else {
      //* actualizar tarea existente
      actualizarTarea( tarea );

      //* limpiar tarea seleccionada
      limpiarTarea();
    }

    //* Obtener y filtrar las tareas de nuevo
    obtenerTareas(proyectoActual._id);

    //* reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
