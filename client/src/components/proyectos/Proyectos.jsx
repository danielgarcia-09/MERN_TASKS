import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

const Proyectos = () => {

    //* Extraer la info del usuario
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(()=> {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">

            <Sidebar/>

            <div className="seccion-principal">

            <Barra/>

                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>

                </main>
            </div>
        </div>
    );
}
 
export default Proyectos;