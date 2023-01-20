import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { userServices } from "./../services/index.js"
dotenv.config()
import config from "./../utils/jwtConfig.js"

export const createUser = async ({req, res, next}) => {
  try{
    const user = await userServices.createUser(req.body)
    return res.status(201).send(user)
  }catch(err){
    next(err)
  }
}

export const getUser = async ({req, res, next}) => { 
  try {
    const user = await userServices.getUser({id: Number(req.params.id)})
    return res.send(user)
  }catch(err) {
    next(err)
  }
}

export const updateUser = async ({req, res, next}) => { 
  try {
    if(!req.body) throw new ErrorHandler({statusCode: 400, message: "Request cannot be" })
    const updatedUser = await userServices.updateUser({id: Number(req.params.id), data: req.body, req})
    res.send(updatedUser)
  }catch(err) {
    next(err)
  }
}

export const deleteUser = async ({req, res, next}) => {
  try {
    await userServices.deleteUser({id: Number(req.params.id), req})
    res.sendStatus(204)
  }catch(err) {
    next(err)
  }
 }

export const loginUser = async ({req, res,next }) => { 
    const user = req.auth
    
    try{
      
    const token = jwt.sign(
      { email: user.email, type: user.type, id: user.id },
      config.secret,
      {
        expiresIn: config.expiresIn,
      }
    );
  
    res.json({ token })
    }catch(err) {
      next(err)
    }
  
  
  }
