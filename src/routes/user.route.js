import { Router } from "express"
import { validate } from "./../middlewares/index.js"
import { userControllers } from "./../controller/index.js"
import { userSchema } from "./../models/index.js"

export const userRouter = (app) => {
  const routerUser = Router()

  routerUser.post("", validate(userSchema), async (req, res) => {
    await userControllers.createUser(req, res)
  })

  app.use("/user", routerUser)
}