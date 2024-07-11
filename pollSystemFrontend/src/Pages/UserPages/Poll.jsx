import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'


const Poll = ({ poll, user }) => {
    const [pollResp, setPollResp] = useState();
    const [pollOptions, setPollOptions] = useState();
    const [pollOptPercentages, setPollOptPercentages] = useState([]);
    const fetchPollResp = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/pollSystem/admin/getAllResponses/${user.user.email}/${poll.pollId}`)
            await setPollResp(data?.pollResponses);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchPollResp();
    }, [])
    const fetchPollOptions = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/pollSystem/admin/getPollOption/${poll.pollId}`);
            const pollOptionsArray = Object.entries(data?.pollOptions[0]).map(([key, value]) => {
                return value;
            })
            setPollOptions(pollOptionsArray);
            const pollOptPercentage = pollOptionsArray?.map((option, index) => {
                if (pollResp.length != 0) {
                    let selectedOptionLength = 0;
                    pollResp?.forEach((pollRes, index) => {
                        if (pollRes?.pollResponse == option) {
                            selectedOptionLength = selectedOptionLength + 1;
                        }
                    })
                    const optionPercentage = Math.round(((selectedOptionLength * 100) / (pollResp?.length)));
                    return optionPercentage;
                }
                else {
                    return 0;
                }
            })

            setPollOptPercentages(pollOptPercentage)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchPollOptions();
    }, [pollResp])
    return (
        <Container>
            <div className="card" style={{ minWidth: '18rem' }}>
                <div className="w-100 card-header">
                    {poll.pollDesc}
                </div>
                <div className="w-100 card-header">
                    {poll.pollTitle}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex flex-row align-items-center justify-content-between">{poll.pollOpt1}
                        <span>{pollOptPercentages ? `${pollOptPercentages[0]}%` : ''}</span>
                        <span><meter value={pollOptPercentages ? pollOptPercentages[0] : '0'} min='0' max='100'></meter></span></li>
                    <li className="list-group-item d-flex flex-row align-items-center justify-content-between">{poll.pollOpt2}
                        <span>{pollOptPercentages ? `${pollOptPercentages[1]}%` : ''}</span>
                        <span><meter value={pollOptPercentages ? pollOptPercentages[1] : '0'} min='0' max='100'></meter></span></li>
                    <li className="list-group-item d-flex flex-row align-items-center justify-content-between">{poll.pollOpt3}
                        <span>{pollOptPercentages ? `${pollOptPercentages[2]}%` : ''}</span>
                        <span><meter value={pollOptPercentages ? pollOptPercentages[2] : '0'} min='0' max='100'></meter></span></li>
                    <li className="list-group-item d-flex flex-row align-items-center justify-content-between">{poll.pollOpt4}
                        <span>{pollOptPercentages ? `${pollOptPercentages[3]}%` : ''}</span>
                        <span><meter value={pollOptPercentages ? pollOptPercentages[3] : '0'} min='0' max='100'></meter></span></li>
                </ul>
            </div>
        </Container>
    )
}

const Container = styled.div`
meter {
      width: 150px;
      height: 40px;
      }
`
export default Poll
