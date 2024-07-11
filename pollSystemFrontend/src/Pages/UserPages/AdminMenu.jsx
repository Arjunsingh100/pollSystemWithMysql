import React from 'react'
import Layout from '../../components/Layout'
import { NavLink, Outlet } from 'react-router-dom'

const AdminMenu = () => {
  return (
        <div className='d-flex flex-row justify-content-center align-items-start'>
            <div className='d-flex flex-row justify-content-start align-items-start mt-5'>
                <ul className='list-group'>
                    <li className='list-group-item list-group-item-dark'><NavLink className='text-decoration-none' to='/admin/menu/allUsers'>All Users</NavLink></li>
                    <li className='list-group-item list-group-item-dark'><NavLink className='text-decoration-none' to='/admin/menu/createPole'>Create Pole</NavLink></li>
                    <li className='list-group-item list-group-item-dark'><NavLink className='text-decoration-none' to='/admin/menu/allPolls'>All Poles</NavLink></li>
                </ul>
            </div>
        </div>
  )
}

export default AdminMenu
