import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { userServices } from "./../services/index.js"
dotenv.config()


export const loginUser = ({req, res}) => { 
  const secret = process.env.SECRETJWT || "insecure"
  const expires = process.env.EXPIRESJWT || "30d"
  const user = req.auth
  
  const config = {
    secret,
    expiresIn: expires,
  }
  
  const token = jwt.sign(
    { email: user.email, type: user.type },
    config.secret,
    {
      expiresIn: config.expiresIn,
    }
  );

  res.json({ token })

}


export const createUser = async ({req, res}) => {
  try{
    const user = await userServices.createUser(req.body)
    return res.status(201).send(user)
  }catch(err){
    res.status(400).json({ message: err.message})
  }
}

export const updateUser = ({req, res}) => { }

export const deleteUser = ({req, res}) => { }

export const getUser = ({req, res}) => { }