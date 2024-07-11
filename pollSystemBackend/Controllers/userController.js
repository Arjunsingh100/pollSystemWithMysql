const connection = require('../db.js');

//fetch polls by user controller
module.exports.getPollsController = async (req, res) => {
    try {
        const { email } = req.params;
        connection.query(`SELECT * FROM pollsystem.polloptiontable
                             JOIN pollsystem.polltable ON pollsystem.polltable.pollId=pollsystem.polloptiontable.pollId`, async (err, result) => {
            connection.query(`SELECT * FROM pollsystem.users WHERE EmailID='${email}'`, (error, result1) => {
                if (error) {
                    console.log(error)
                }
                const filterResult = result.filter((poll, index) => {
                    if (poll.visibility == result1[0].Role) {
                        return poll;
                    }
                });
                console.log(filterResult)
                connection.query(`select * from pollsystem.pollresponsetable
                              JOIN pollsystem.polltable ON pollsystem.polltable.pollId=pollsystem.pollresponsetable.pollId
                              JOIN pollsystem.users ON pollsystem.users.id=pollsystem.pollresponsetable.userId;`, async (error1, result2) => {
                    if (error1) {
                        console.log(error1)
                    }
                    console.log(result2)
                    const filteredPolls = filterResult.filter((poll, ind) => {
                        const matchPollResp = result2.some((resp, index) => {
                            if (resp.pollId == poll.pollId && email == resp.EmailID ) {
                                return true;
                            }
                        });
                        console.log(matchPollResp)
                        if (matchPollResp == false) {
                            return poll;
                        }
                    })
                    res.status(200).send({
                        success: true,
                        message: 'All polls fetched successfully',
                        polls: filteredPolls
                    })
                })
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while fetchin the Polls',
            error
        })
    }
}

//store pollRespones in table controller
module.exports.storePollResponseController = async (req, res) => {
    try {
        const { pollId, userId, pollResponse } = req.body;
        connection.query(`INSERT INTO pollsystem.pollresponsetable (pollId,userId,pollResponse) VALUES ('${pollId}','${userId}','${pollResponse}')`, (error, result) => {
            if (error) {
                console.log(error)
            }
            return res.status(200).send({
                success: true,
                message: 'Poll response submitted successfully',
                result: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: true,
            message: 'Error while storing pollResponse',
            error
        })
    }
}