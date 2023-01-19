import { Router } from "express"


export const userRouter = (app) => {
  const routerUser = Router()

  routerUser.get("/", (req, res) => {
    res.send("OK")
  })

  app.use(routerUser)
}