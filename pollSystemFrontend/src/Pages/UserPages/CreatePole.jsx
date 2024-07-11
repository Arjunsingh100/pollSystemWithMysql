import { React, useState } from 'react'
import AdminMenu from './AdminMenu'
import '../Auth/register.css'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { Select } from 'antd';
const { Option } = Select;

const CreatePole = () => {
  const [pollTitle, setPollTitle] = useState('');
  const [pollDesc, setPollDesc] = useState('');
  const [pollOpt1, setPollOpt1] = useState('');
  const [pollOpt2, setPollOpt2] = useState('');
  const [pollOpt3, setPollOpt3] = useState('');
  const [pollOpt4, setPollOpt4] = useState('');
  const [visibility, setVisibility] = useState('');
  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    const currectUser = await localStorage.getItem('auth');
    const parsedCurrectUser = JSON.parse(currectUser);
    console.log(pollDesc, pollTitle, pollOpt1, pollOpt2, pollOpt3, pollOpt4);
    const { data } = await axios.post(`http://localhost:5000/api/v1/pollSystem/admin/createPoll/${parsedCurrectUser.user.email}`,
      { pollId: uuid, pollTitle, pollDesc, pollOpt1, pollOpt2, pollOpt3, pollOpt4,visibility }
    );
    console.log(data)
  }
  return (
    <div className='w-100 d-flex flex-row justify-content-center align-items-start gap-5'>
      <AdminMenu />
      <div style={{ width: '80vh' }} className='mt-5'>
        <div style={{ minHeight: '80vh' }} className='d-flex flex-row align-items-center justify-content-center'>
          <form className='registration' onSubmit={handleCreatePoll}>
            <h3>Create a poll</h3>
            <input type='text'
              placeholder='Enter poll Title'
              required
              name='title'
              onChange={(e) => { setPollTitle(e.target.value) }} />
            <input type='type'
              placeholder='Enter poll Description'
              name='description'
              required
              onChange={(e) => { setPollDesc(e.target.value) }} />
            <input max='10' type='text'
              placeholder='Enter poll option1'
              name='option1'
              required
              onChange={(e) => { setPollOpt1(e.target.value) }} />
            <input max='10' type='text'
              placeholder='Enter poll option2'
              name='option2'
              required
              onChange={(e) => { setPollOpt2(e.target.value) }} />
            <input max='10' type='text'
              placeholder='Enter poll option3'
              name='option3'
              required
              onChange={(e) => { setPollOpt3(e.target.value) }} />
            <input max='10' type='text'
              placeholder='Enter poll option4'
              name='option4'
              required
              onChange={(e) => { setPollOpt4(e.target.value) }} />
            <Select
              className='select'
              placeholder='Select Visibility'
              showSearch
              required
              size='large'
              onChange={(value) => { setVisibility(value) }}>
              <Option className='option w-100' value='Teacher'>Teacher</Option>
              <Option className='option w-100' value='Student'>Student</Option>
              <Option className='option w-100' value='Institute'>Institute</Option>
            </Select>
            <button type='submit' className='mb-4'>Create Poll</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePole
