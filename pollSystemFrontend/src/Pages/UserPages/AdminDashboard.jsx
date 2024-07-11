import Layout from '../../components/Layout'
import React from 'react'
import AdminMenu from './AdminMenu'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default AdminDashboard
