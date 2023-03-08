// Importing Authentication Middleware
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const {sign, verify}  = jwt

dotenv.config();

// Creating a token
export default function createToken(client) {
    return sign(
        {
            email: client.email,
            client_password: client.client_password
        },
        process.env.SECRET_KEY, 
        { 
            expiresIn: '1h'
        }
    );
}

// create and export method to verify a token
export  function verifyAToken(req, res, next) {
    try{
        const token = req.cookies["LegitClient"] !== null ? req.cookies["LegitClient"] :
        "Please register" ;
        const isValid = null;
        if(token !== "Please register") {
            isValid = verify(token, process.env.SECRET_KEY);
            if(isValid) {
                req.authenticated = true;
                next();
            }else {
                res.status(400).json({err: "Please register"})
            }
        }else {
            res.status(400).json({err: "Please register"})
        }
    }catch(e) {
        res.status(400).json({err: e.message});
    }
}
