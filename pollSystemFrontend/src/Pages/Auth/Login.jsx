import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css'
const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const obj = {
            name:name, email:email, phone:phone
        }
        console.log(obj)
    }

    return (
        <div>
            <form className='registration' onSubmit={handleLogin}>
                <h1>Login Form</h1>
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
                    <input max='10' type='phone'
                    placeholder='Enter Password'
                    name='name'
                    required
                    onChange={(e) => { setPassword(e.target.value) }} />
                <button type='submit'>Sign Up</button>
                <Link to='/register'>Sign Up</Link>
            </form>
        </div>
    )
}

export default Login
