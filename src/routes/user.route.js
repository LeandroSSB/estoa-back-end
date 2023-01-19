import { Router } from "express"
import { userControllers } from "./../controller/index.js"

export const userRouter = (app) => {
  const routerUser = Router()

  routerUser.post("", async (req, res) => {
    await userControllers.createUser(req, res)
  })

  app.use("/user", routerUser)
}