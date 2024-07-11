import { React, useState, useEffect } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { styled } from 'styled-components'
import { useAuth } from '../../Context/authentication';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState();
  const fetchUsers = async () => {
    const currectUser = await localStorage.getItem('auth');
    const parsedCurrectUser = JSON.parse(currectUser);
    const { data } = await axios.get(`http://localhost:5000/api/v1/pollSystem/admin/getAllUsers/${parsedCurrectUser.user.email}`)
    setUsers(data?.users)
  }
  useEffect(() => {
    fetchUsers();
  }, [])
  const handleDeleteUser = async (userId) => {
    const currectUser = await localStorage.getItem('auth');
    const parsedCurrectUser = JSON.parse(currectUser);
    console.log(parsedCurrectUser?.user?.email)
    const { data } = axios.delete(`http://localhost:5000/api/v1/pollSystem/admin/deleteUser/${parsedCurrectUser.user.email}/${userId}`);
    fetchUsers();
  }
  return (
    <Container>
      <div className='w-100 d-flex flex-row justify-content-center align-items-start gap-5'>
        <AdminMenu />
        <div style={{ width: '80vh' }} className='mt-5'>
          {
            users?.map((riskObj, index) => {
              return (
                <div key={index} className="card border-success mb-3" style={{ width: '95%' }}>
                  <div className="card-header bg-transparent border-success">
                    <div>
                      <p className="card-text" style={{ paddingTop: '15px' }}>USER ID: {riskObj?.id}</p>
                      <button></button>
                    </div>
                    <div>
                      <p className="card-text" style={{ paddingTop: '15px' }}>User Role: {riskObj?.Role}</p>
                      <div className="form-check form-switch">
                        <button type="button" className="btn btn-danger" onClick={() => { handleDeleteUser(riskObj?.id) }}>Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-success"><h6>USER NAME: {riskObj?.Name}</h6>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
button {
outline:none;
border:none;
border-radius:8px;
cursor:none;
}
display:flex;
flex-direction:column;
gap:20px;
align-items:center;
justify-content:center;
.card {
.card-header{
height:40px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
div {
height:40px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
gap:25px;
}
}
}
`

export default AllUsers
