import React, { useEffect } from 'react';
//CSS
import '../styles/formBody.css'
const FormBody = () => {
    
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
        <form>
            <h1>Create Account</h1>
                <div className='social-icons'>
                    <a href='#' className='icon'><i class='bx bxl-google'></i></a>
                    <a href='#' className='icon'><i class='bx bxl-facebook'></i></a>
                    <a href='#' className='icon'><i class='bx bxl-github'></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type='text' placeholder='Name'></input>
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button>Sign Up</button>
        </form>
      </div>
      <div className='form-container sign-in'>
        <form>
            <h1>Sign In</h1>
                <div className='social-icons'>
                    <a href='#' className='icon'><i class='bx bxl-google'></i></a>
                    <a href='#' className='icon'><i class='bx bxl-facebook'></i></a>
                    <a href='#' className='icon'><i class='bx bxl-github'></i></a>
                </div>
                <span>or use your email and password</span>
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
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
