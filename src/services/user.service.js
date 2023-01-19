import prisma from "./../database.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

export const createUser = async (userData) => {
  const salt = process.env.SALT || 10
  const [ password, ...newUser ] = userData  
  bcrypt.hashSync(password, salt)

  await prisma.user.create({
    data: {
      password: password,
      ...newUser
    }
  })
}

export const deleteUser = async ({id}) => {
  await prisma.user.delete({
    where: {id: id},
  })
}

export const updateUser = async ({id, data}) => {
  await prisma.user.update({
    where:{
      id: id
    },
    data: data
  })

}


export const getUser = async ({id}) => {
  await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}