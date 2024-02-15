require('dotenv').config();
const jwt = require('jsonwebtoken');

const fetchUser = async(req, res, next)=>{
    const token = req.header('token');
    // console.log(token);
    if(!token){
        res.status(401).send({message:"Please give valid token"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ message: "Please authenticate using a valid token" }, error)
    }
}

module.exports = fetchUser;

