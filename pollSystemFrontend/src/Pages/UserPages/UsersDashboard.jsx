import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/Layout'

const UsersDashboard = ({children}) => {
    return (
        <div>
           <Layout>
            <div><h2>this is user dahsboard</h2></div>
           </Layout>
        </div>
    )
}

export default UsersDashboard
