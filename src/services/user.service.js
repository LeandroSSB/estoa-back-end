import prisma from "./../database/index.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { ErrorHandler } from "./../utils/errors.js"
dotenv.config()

export const createUser = async (userData) => {
  const salt = process.env.SALT || 10
  const [ password, ...newUser ] = userData  
  const encryptPass = bcrypt.hashSync(password, salt)
  try{
    await prisma.user.create({
      data: {
        password: encryptPass,
        ...newUser
      }
    })
  }catch(err){
    throw new ErrorHandler({statusCode: 400, message: err.message})
  }
}

export const deleteUser = async ({id}) => {
  await prisma.user.delete({
    where: {id},
  })
}

export const updateUser = async ({id, data}) => {
  const update = await prisma.user.update({
    where:{
      id
    },
    data
  })

  if(!update?.email) throw new ErrorHandler({ statusCode : 404, message: "User not found"})
  delete update.password

  return update
}


export const getUser = async ({id}) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

    if(!user?.email) throw new ErrorHandler({ statusCode: 404, message: "User not found"})

    
    delete user.password
    return user
  
}

export const loginUser = async ({email, password}) => {
  const user = await prisma.user.findUnique({
    where: { email, }
  })
  if (!user?.email) throw new ErrorHandler({statusCode: 401, message: "Email or password incorrect"})
  
  const match = bcrypt.compareSync(user.password, password)
  
  if (!match) throw new ErrorHandler({statusCode: 401, message: "Email or password incorrect"})
  

  return user
 }