import { React, useState, useEffect } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import Poll from './Poll';

const AdminPoll = () => {
    const [allPolls, setAllPolls] = useState();
    const [user,setUser] = useState();

    const fetchAllPolls = async () => {
        const currectUser = await localStorage.getItem('auth');
        const parsedCurrectUser = JSON.parse(currectUser);
        const { data } = await axios.get(`http://localhost:5000/api/v1/pollSystem/admin/allPolls/${parsedCurrectUser.user.email}`);
        setAllPolls(data?.polls)
        console.log(data);
    }
    const analyzePollResponses = async (pollId) => {
        const currectUser = await localStorage.getItem('auth');
        const parsedCurrectUser = JSON.parse(currectUser);
        setUser(parsedCurrectUser);
    }
    useEffect(() => {
        fetchAllPolls();
        analyzePollResponses();
    }, [])
    return (
        <div className='w-100 d-flex flex-row justify-content-center align-items-start gap-5 overflow-hidden'>
            <AdminMenu />
            <div style={{ width: '80vw'}} className='d-flex flex-row flex-wrap justify-content-start align-items-start gap-5 mt-5'>
                {
                    allPolls?.map((poll, index) => {
                        return (
                            <Poll key={index} poll={poll} user={user} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminPoll
