const connection = require('../db.js')

module.exports.getAllUsers = async (req, res) => {
    try {
        connection.query(`SELECT * FROM pollsystem.users;`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            return res.status(200).send({
                success: true,
                message: 'getted all users successfully',
                users: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: true,
            message: 'Error while fetchin Users',
            error
        })
    }
}

//delete a user by admin 
module.exports.deleteUser = async (req, res) => {
    try {
        const { Uid } = req.params;
        console.log(Uid)
        connection.query(`DELETE FROM pollsystem.users WHERE id ='${Uid}'`, async (err, result) => {
            res.status(200).send({
                success: true,
                message: 'user deleted successfully',
                result: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: 'Error while Deleting a user',
            error
        })
    }
}

//creat a poll 
module.exports.createPoll = async (req, res) => {
    try {
        const { pollTitle, pollDesc, pollOpt1, pollOpt2, pollOpt3, pollOpt4, visibility } = req.body;
        console.log(req.body);
        connection.query(`INSERT INTO pollsystem.pollTable (pollTitle,pollDesc,visibility) VALUES ('${pollTitle}','${pollDesc}','${visibility}')`, async (err, result) => {
            if (result) {
                connection.query(`INSERT INTO pollsystem.pollOptionTable (pollOpt1,pollOpt2,pollOpt3,pollOpt4) VALUES
                    ('${pollOpt1}','${pollOpt2}','${pollOpt3}','${pollOpt4}')`, (error, result1) => {
                    if (error) {
                        console.log(error)
                    }
                    return res.status(200).send({ success: true, message: 'Poll created successfully', result: result1 })
                })
            }
        })

    } catch (error) {
        res.status(500).send({
            success: true,
            message: 'Error while creating a poll',
            error
        })
    }
}

//get all polls Controller
module.exports.getAllPolls = async (req, res) => {
    try {
        connection.query(`SELECT * FROM pollsystem.polloptiontable
                             JOIN pollsystem.polltable ON pollsystem.polltable.pollId=pollsystem.polloptiontable.pollId`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            return res.status(200).send({
                success: true,
                message: 'All polls getted successfully',
                polls: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: true,
            message: 'Erro while getting all polls',
            error
        })
    }
}

//fetch all poll Responses 
module.exports.getAllPollResponsesController = async (req, res) => {
    try {
        const { pollId } = req.params;
        connection.query(`SELECT * FROM pollsystem.pollresponsetable WHERE pollId='${pollId}'`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            return res.status(200).send({
                success: true,
                message: 'Poll responsed got successfully',
                pollResponses: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting poll Responses',
            error
        })
    }
}

//fetch poll options controller
module.exports.pollOptionsController = async (req, res) => {
    try {
        const { pollId } = req.params;
        connection.query(`SELECT pollOpt1,pollOpt2,pollOpt3,pollOpt4 FROM pollsystem.polloptiontable WHERE pollId='${pollId}'`, async (error, result) => {
            if (error) {
                console.log(error)
            }
            return res.status(200).send({
                success: true,
                message: 'All poll options got successfull',
                pollOptions: result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while fetching poll Option',
            error
        })

    }
}