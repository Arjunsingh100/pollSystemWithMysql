const connection = require('../db.js')
const bcrypt = require('bcrypt')

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
            console.log(hashpassword)
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
    res.send({ success: true, content: 'You have login successfully' })
}