import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'
import { Select } from 'antd';
const { Option } = Select;
import './register.css'
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleRegistration = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:5000/api/v1/pollsystem/auth/register', { name, email, phone, role, password });
        console.log(data)
        if (data.success) {
            navigate('/login');
            toast.success(data.action);
        }
        else {
            toast.error(data.action);
        }
    }
    return (
        <div>
            <form className='registration' onSubmit={handleRegistration}>
                <h1>Registration Form</h1>
                <input type='text'
                    placeholder='Enter your name'
                    name='name'
                    required
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
                <Select
                    className='select'
                    placeholder='Select Role'
                    showSearch
                    required
                    size='large'
                    onChange={(value) => { setRole(value) }}>
                    <Option className='option' value='Teacher'>Teacher</Option>
                    <Option className='option' value='Student'>Student</Option>
                    <Option className='option' value='Institute'>Institute</Option>
                </Select>
                <input max='10' type='phone'
                    placeholder='Enter Password'
                    name='name'
                    required
                    onChange={(e) => { setPassword(e.target.value) }} />
                <button type='submit'>Sign Up</button>
                <Link to='/login'>Sign In</Link>
            </form>
        </div>
    )
}

export default Register
