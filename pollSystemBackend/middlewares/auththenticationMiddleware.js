const JWT=require('jsonwebtoken');
const connection = require('../db.js');

module.exports.requireSignIn=(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.SECRET_KEY);
        req.user=decode;
        next();
    }
    catch(error){
        res.send({
            success:false,
            requireSingIn:true,
            message:'Please login'
        })
        console.log(error)
    }
}
module.exports.isAdmin = async (req,res,next)=>{
    connection.query(`SELECT * FROM pollsystem.users WHERE EmailID='${req.params.email}'`, async (err,result) => {
        if(result[0]?.Role !== 'Institute'){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Acess'
            })
        }else{
            next();
        }
    })
}