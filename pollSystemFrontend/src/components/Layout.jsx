import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main className='position-relative' style={{ width: '100vw', maxHeight: '80vh',marginTop:'80px',marginBottom:'120px' }}>{props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout
