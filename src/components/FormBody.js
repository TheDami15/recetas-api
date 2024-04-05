import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//CSS
import '../styles/formBody.css'
const FormBody = () => {
    // Estados para manejar los inputs del formulario de registro
    const [registerData, setRegisterData] = useState({
        nombre: '',
        password: '',
    });

    // Estados para manejar los inputs del formulario de inicio de sesión
    const [loginData, setLoginData] = useState({
        nombre: '',
        password: '',
    });

    // For registration status
    const [registerErrors, setRegisterErrors] = useState([]);
    const [registerSuccess, setRegisterSuccess] = useState('');
    // For login status
    const [loginErrors, setLoginErrors] = useState([]);
    const [loginSuccess, setLoginSuccess] = useState('');
    const navigate = useNavigate();


    // Manejador de cambios en el formulario de registro
    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejador de cambios en el formulario de inicio de sesión
    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejador del envío del formulario de registro
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://apirecetes-50a9e4e6edb1.herokuapp.com/admin/user/register', registerData);
            console.log(response.data);
            setRegisterErrors([]); // Reset errors if successful
            setRegisterSuccess("Registro exitoso. Bienvenido a la plataforma!");
        } catch (error) {
            // Verificar primero si existe un error específico (como un usuario ya existente)
            if (error.response && error.response.data && typeof error.response.data === 'string') {
                // Esto captura el caso de un mensaje de error simple como "Ya existe un usuario con ese nombre"
                setRegisterErrors([error.response.data]);
            } else if (error.response && error.response.data.errors) {
                // Esto maneja errores de validación estructurados
                setRegisterErrors(error.response.data.errors.map(err => err.msg));
            } else {
                // Manejo de otros tipos de errores (por ejemplo, errores de red)
                setRegisterErrors(["A network or server error occurred. Please try again."]);
            }
        }
    };



    // Manejador del envío del formulario de inicio de sesión
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://apirecetes-50a9e4e6edb1.herokuapp.com/admin/user/login', loginData);
            console.log(response.data);
            setLoginErrors([]); // Reset errors if successful
            localStorage.setItem('token', response.data.token); // Store the token
            setLoginSuccess("Inicio de sesión exitoso. ¡Bienvenido de nuevo!");
            navigate('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    // Verifica si el error es una cadena simple (e.g., "Usuario no encontrado")
                    if (typeof error.response.data === 'string') {
                        setLoginErrors([error.response.data]);
                    } else if (error.response.data.errors) {
                        // Maneja errores de validación estructurados
                        setLoginErrors(error.response.data.errors.map(err => err.msg));
                    } else {
                        // Si error.response.data no es una cadena ni contiene errors, intenta usar un mensaje genérico
                        setLoginErrors([error.response.data.message || "An error occurred"]);
                    }
                } else {
                    // Maneja otros códigos de estado de error
                    setLoginErrors(["A network or server error occurred. Please try again."]);
                }
            } else {
                // Maneja casos donde error.response no está definido (e.g., problemas de red)
                setLoginErrors(["A network or server error occurred. Please try again."]);
            }
        }
    };





    useEffect(() => {
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const containerForm = document.getElementById('container-form');

        registerBtn.addEventListener('click', () => {
            containerForm.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            containerForm.classList.remove("active");
        });

        return () => {
            registerBtn.removeEventListener('click', () => {
                containerForm.classList.add("active");
            });
            loginBtn.removeEventListener('click', () => {
                containerForm.classList.remove("active");
            });
        };
    }, []);

    return (
        <div className='bodyform'>
            <div className='container-form' id='container-form'>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                <div className='form-container sign-up'>
                    <form onSubmit={handleRegisterSubmit}>
                        {registerErrors.length > 0 && (
                            <div className="error-messages">
                                {registerErrors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        {registerSuccess && <div className="success-message">{registerSuccess}</div>}

                        <h1>Create Account</h1>
                        <div className='social-icons'>
                            <a href='#' className='icon'><i className='bx bxl-google'></i></a>
                            <a href='#' className='icon'><i className='bx bxl-facebook'></i></a>
                            <a href='#' className='icon'><i className='bx bxl-github'></i></a>
                        </div>

                        <span>or use your email for registeration</span>
                        <input type='text' name='nombre' placeholder='Name' onChange={handleRegisterChange} value={registerData.nombre}></input>
                        <input type='password' name='password' placeholder='Password' onChange={handleRegisterChange} value={registerData.password}></input>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className='form-container sign-in'>
                    <form onSubmit={handleLoginSubmit}>
                        {loginErrors.length > 0 && (
                            <div className="error-messages">
                                {loginErrors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        {loginSuccess && <div className="success-message">{loginSuccess}</div>}

                        <h1>Sign In</h1>
                        <div className='social-icons'>
                            <a href='#' className='icon'><i className='bx bxl-google'></i></a>
                            <a href='#' className='icon'><i className='bx bxl-facebook'></i></a>
                            <a href='#' className='icon'><i className='bx bxl-github'></i></a>
                        </div>

                        <span>or use your email and password</span>
                        <input type='text' name='nombre' placeholder='Name' onChange={handleLoginChange} value={loginData.name}></input>
                        <input type='password' name='password' placeholder='Password' onChange={handleLoginChange} value={loginData.password}></input>
                        <a href='#'>Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className='toggle-container'>
                    <div className='toggle'>
                        <div className='toggle-panel toggle-left'>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className='hidden' id='login'>Sign In</button>
                        </div>
                        <div className='toggle-panel toggle-right'>
                            <h1>Hello Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className='hidden' id='register'>Sign Up</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default FormBody
