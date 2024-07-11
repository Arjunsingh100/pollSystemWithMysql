import React from 'react'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Polls = () => {
    const [answer, setAnswer] = useState('');
    const [polls, setPolls] = useState();

    const fetchingAllPolls = async () => {
        const currectUser = await localStorage.getItem('auth');
        const parsedCurrectUser = JSON.parse(currectUser);
        const { data } = await axios.get(`http://localhost:5000/api/v1/pollSystem/user/getAllPolls/${parsedCurrectUser.user.email}`);
        console.log(data)
        setPolls(data?.polls)
    }
    useEffect(() => {
        fetchingAllPolls();
    }, [])
    // const onOptionChange = e => {
    //     setAnswer(e.target.value);
    //     console.log(answer)
    // }
    const handleSubmit = async (e, pollId) => {
        e.preventDefault();
        const currectUser = await localStorage.getItem('auth');
        const parsedCurrectUser = JSON.parse(currectUser);
        console.log(parsedCurrectUser.user.userId, answer, pollId);
        const { data } = await axios.post('http://localhost:5000/api/v1/pollSystem/user/submitPollResponse',
            {
                pollId,
                userId: parsedCurrectUser.user.userId,
                pollResponse: answer
            }
        )
        fetchingAllPolls();
        if(data?.success){
            toast.success(data?.message)
        }
    }
    return (
        <Layout>
            <div className="App d-flex flex-row flex-wrap justify-content-center align-items-start gap-3">
                {
                    polls?.map((poll, index) => {
                        return (
                            <div key={index} style={{ width: '22rem' }}>
                                <form className='border border-warning-subtle rounded-2 d-flex flex-column justify-content-center align-items-center gap-3'>
                                    <h4 className='mt-2'>{poll.pollTitle}</h4>

                                    <div style={{ width: '19rem' }} className='border border-secondary-subtle rounded-2 p-2'>
                                        <input
                                            className='ml-3'
                                            type="radio"
                                            name="topping"
                                            value={poll?.pollOpt1}
                                            id="regular"
                                            checked={answer == `${poll?.pollOpt1}`}
                                            onChange={(e) => { setAnswer(e.target.value) }}
                                        />
                                        <label className='ms-3' htmlFor="regular">{poll?.pollOpt1}</label>
                                    </div>

                                    <div style={{ width: '19rem' }} className='border border-secondary-subtle rounded-2 p-2'>
                                        <input
                                            className='ml-3'
                                            type="radio"
                                            name="topping"
                                            value={poll?.pollOpt2}
                                            id="medium"
                                            checked={answer === `${poll?.pollOpt2}`}
                                            onChange={(e) => { setAnswer(e.target.value) }}
                                        />
                                        <label className='ms-3' htmlFor="medium">{poll?.pollOpt2}</label>
                                    </div>

                                    <div style={{ width: '19rem' }} className='border border-secondary-subtle rounded-2 p-2'>
                                        <input
                                            className='ml-3'
                                            type="radio"
                                            name="topping"
                                            value={poll?.pollOpt3}
                                            id="large"
                                            checked={answer === `${poll?.pollOpt3}`}
                                            onChange={(e) => { setAnswer(e.target.value) }}
                                        />
                                        <label className='ms-3' htmlFor="large">{poll?.pollOpt3}</label>
                                    </div>
                                    <div style={{ width: '19rem' }} className='border border-secondary-subtle rounded-2 p-2'>
                                        <input
                                            className='ml-3'
                                            type="radio"
                                            name="topping"
                                            value={poll?.pollOpt4}
                                            id="x-large"
                                            checked={answer === `${poll?.pollOpt4}`}
                                            onChange={(e) => { setAnswer(e.target.value) }}
                                        />
                                        <label className='ms-3' htmlFor="x-large">{poll?.pollOpt4}</label>
                                    </div>

                                    <div style={{ width: '19rem' }} className='d-flex flex-column jusitfy-content-center align-items-center gap-2'>
                                        <button onClick={(e) => { handleSubmit(e, poll?.pollId) }} type='submit' className='btn btn-primary mb-2'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export default Polls
