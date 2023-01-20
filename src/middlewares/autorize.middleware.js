import jwt  from "jsonwebtoken"
import { ErrorHandler } from "../utils/errors.js";
import config from "./../utils/jwtConfig.js";



export const autorizeMiddleware = async (req,_res,next) => { 
  try {
    const token = req.headers.authorization?.split(" ")[1] || ""
    jwt.verify(token, config.secret, (err, decode) => {
      if(err) throw new ErrorHandler({statusCode: 401, message: err.message})
      req.auth = decode;
    });
    return next();
  }catch(err) {
    next(err)
  }

}