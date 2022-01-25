import { useReducer } from "react"
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, LIMPIAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../types";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from '../../config/axios';

const TareaState = (props) => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    //* Crear state y dispatch
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    //* Crear las funciones -----------

    //* Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } })
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    //* Agregar Tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error.response);
        }

    }

    //* Validar la tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //! Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
       try {
           await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
           dispatch({
               type: ELIMINAR_TAREA,
               payload: id
           })
       } catch (error) {
           console.log(error);
       }
    }


    //* Extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //* Editar o modifica una tarea
    const actualizarTarea = async tarea => {
        try {
            
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    //* Limpiar tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}
export default TareaState;