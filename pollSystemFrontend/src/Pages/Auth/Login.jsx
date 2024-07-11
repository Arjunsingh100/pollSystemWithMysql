import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth } from '../../Context/authentication';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(name, email, phone, password)
        const { data } = await axios.post('http://localhost:5000/api/v1/pollSystem/auth/login', { name, email, password, phone });
        console.log(data)
        if (data.success) {
            setAuth({
                ...auth,
                user: data.user,
                token: data.token
            })
            const setLoginUser = localStorage.setItem('auth', JSON.stringify(data));
            toast.success(data.message);
            if (data.user.role === 'Institute') {
                navigate(location.state || '/admin')
            }
            else {
                navigate(location.state || '/')
            }
        }
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <Header />
            <div style={{minHeight:'80vh'}} className='d-flex flex-row align-items-center justify-content-center'>
                <form className='registration' onSubmit={handleLogin}>
                    <h3>Login Form</h3>
                    <input type='text'
                        placeholder='Enter your name'
                        required
                        name='name'
                        onChange={(e) => { setName(e.target.value) }} />
                    <input type='email'
                        placeholder='Enter your Email'
                        name='email'
                        required
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <input max='10' type='phone'
                        placeholder='Enter your Phone'
                        name='name'
                        required
                        onChange={(e) => { setPhone(e.target.value) }} />
                    <input max='10' type='password'
                        placeholder='Enter Password'
                        name='name'
                        required
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <button type='submit'>Sign In</button>
                    <Link to='/register'>Sign Up</Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login
