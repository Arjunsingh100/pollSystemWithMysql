import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'
import { Select } from 'antd';
const { Option } = Select;
import './register.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass,setPass] = useState(true);
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
        <div className='w-100 h-100 d-flex flex-column align-items-center'>
            <Header />
            <div style={{ minHeight: '80vh' }} className='d-flex flex-row align-items-center justify-content-center'>
                <form className='registration' onSubmit={handleRegistration}>
                    <h3>Registration Form</h3>
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
                        <Option className='option w-100' value='Teacher'>Teacher</Option>
                        <Option className='option w-100' value='Student'>Student</Option>
                        <Option className='option w-100' value='Institute'>Institute</Option>
                    </Select>
                    <input max='10' type= {pass?'password':'text'}
                        placeholder='Enter Password'
                        name='name'
                        required
                        onChange={(e) => { setPassword(e.target.value) }} />
                        <div style={{color:'gray',cursor:'pointer',position:'absolute',right:'2rem',bottom:'7.4rem'}} onClick={()=>{setPass(!pass)}}>
                            {pass?'show':'hide'}
                        </div>
                    <button type='submit'>Sign Up</button>
                    <Link to='/login'>Sign In</Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Register
