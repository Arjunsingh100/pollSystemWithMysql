const connection = require('../db.js')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { comparePassword } = require('../helpers/authenticationHelper.js')


module.exports.registerController = async (req, res) => {
    try {
        const { name, email, phone, role, password } = req.body;
        connection.query(`SELECT * FROM pollsystem.users WHERE EmailID='${email}'`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                return res.send({ success: false, data: result, action: 'You are already register with us' })
            }

            const hassedPassword = async (pass) => {
                const saltRounds = 10;
                const hasspassword = await bcrypt.hash(pass, saltRounds);
                return hasspassword;
            }
            const hashpassword = await hassedPassword(password);
           
            connection.query(`INSERT INTO pollsystem.users (Name,EmailID,PhoneNumber,Role,Password) VALUES ('${name}','${email}','${phone}','${role}','${hashpassword}')`,
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).send({ success: true, action: 'You have register successfully', data: result })
                })

        });
    } catch (error) {
        res.status(500).send({ success: false, Error: error })
    }
}

module.exports.loginController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body)
        connection.query(`SELECT * FROM pollsystem.users WHERE EmailID='${email}'`, async (err, result) => {
            console.log(result)
            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: 'You email not exits'
                })
            }
            const match = comparePassword(password, result[0].Password);
            if (match === false) {
                return res.status(200).send({
                    success: false,
                    message: 'Password is wrong'
                })
            }
            const token = await JWT.sign({ id: result.id }, process.env.SECRET_KEY, { expiresIn: '7d' });
            res.status(200).send({
                success: true,
                message: 'User login successfully',
                user: {
                    userId:result[0].id,
                    name: result[0].Name,
                    email: result[0].EmailID,
                    phone: result[0].Phone,
                    role: result[0].Role
                },
                token,
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}