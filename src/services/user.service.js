import prisma from "./../database/index.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { ErrorHandler } from "./../utils/errors.js"
dotenv.config()

export const createUser = async (userData) => {
  const salt = process.env.SALT || 10
  const { password, confirmPassword,  ...newUser } = userData  
  const encryptPass = bcrypt.hashSync(password, salt)
  try{
   const user = await prisma.user.create({
      data: {
        password: encryptPass,
        ...newUser
      }
    })

    return user
  }catch(err){
    throw new ErrorHandler({statusCode: 409, message: "Email already exists"})
  }
}

export const deleteUser = async ({id, req}) => {
  console.log(id, req.auth.id)
  if(req.auth.id  != id || !req.auth.type) {
    throw new ErrorHandler({statusCode: 401, message: "You do not have permission to delete this user"})
  }
  try {
    // await prisma.user.delete({
    //   where: {id},
    // })

    await prisma.user.update({
      where: {id},
      data: {
        deleted_at: new Date().toJSON()
      }
    })
  }catch(err) {
    throw new ErrorHandler({statusCode: 404, message: "User not found"})
  }
  
}

export const updateUser = async ({id, data, req}) => {

  if(req.auth.id  != id) {
    throw new ErrorHandler({statusCode: 401, message: "You do not have permission to update this user"})
  }
  
  const update = await prisma.user.update({
    where:{
      id
    },
    data: {
      updated_at: new Date().toJSON(),
      ...data
    }
  })
  
  if(!update?.email) throw new ErrorHandler({ statusCode : 404, message: "User not found"})
  delete update.password
  
  return update
}

export const getUser = async ({id}) => {
  
  if (!id )  {
    const users = await prisma.user.findMany()
    users.forEach(user => delete user.password)

    return users
  } 


  const user = await prisma.user.findUnique({
    where: {id: id},
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
  
  const match = bcrypt.compareSync(password ,user.password)
  
  if (!match) throw new ErrorHandler({statusCode: 401, message: "Email or password incorrect"})
  

  return user
 }