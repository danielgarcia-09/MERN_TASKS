import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Login = (props) => {

    //* Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext; 
    
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    const ProyectoContext = useContext(proyectoContext);
    const { limpiarProyecto } = ProyectoContext;

    //* En caso de que el password o usuario no exista
    useEffect(()=>{
        if( autenticado ) {
        props.history.push('/proyectos') //* Se envia el usuario a la pag de proyectos
        }

        if( mensaje ) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history]);


    //* State para iniciar sesion
    const [ usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });

    //* extraer de usuario
    const { email, password } = usuario;

    //* Para leer los inputs
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //* Cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //* Validar campos vacios
        if( email.trim() === '' || password.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        //* Limpiar cualquier proyecto seleccionado antes de cerrar sesion
        limpiarProyecto();

        //* Pasarlo al action
        iniciarSesion({email, password});
    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link 
                    to={'/nueva-cuenta'} 
                    className="enlace-cuenta"
                >
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;