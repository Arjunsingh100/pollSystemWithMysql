const bcrypt = require('bcrypt')
module.exports.comparePassword = async (plainPassword,hashedPassword) => {
    return bcrypt.compare(plainPassword,hashedPassword)
}