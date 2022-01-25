import { useContext, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom'
import AuthContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {


    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(()=> {
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])

    //* Para revisar si un usuario esta autenticado y proteger la ruta

    return (
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
    );
}
 
export default RutaPrivada;