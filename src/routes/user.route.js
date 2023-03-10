import { Router } from "express"
import { validate, authMiddleware, autorizeMiddleware} from "./../middlewares/index.js"
import { userControllers } from "./../controller/index.js"
import { userSchemas } from "./../models/index.js"

export const userRouter = (app) => {
  const routerUser = Router()

  routerUser.get("/:id", async (req, res, next) => {
    await userControllers.getUser({ req, res, next })
  })
  routerUser.get("", async (req, res, next) => {
    await userControllers.getUser({ req, res, next })
  })
  routerUser.post("", validate(userSchemas.userSchema), async (req, res, next) => {
    await userControllers.createUser({req, res, next})
  })
  routerUser.post("/login", validate(userSchemas.loginSchema), authMiddleware, async (req, res, next) => {
    await userControllers.loginUser({ req, res, next })
  })
  routerUser.patch("/:id", validate(userSchemas.userSchemaOpcional), autorizeMiddleware, async (req, res, next) => {
    await userControllers.updateUser({ req, res, next })
  })
  routerUser.delete("/:id", autorizeMiddleware, async (req, res, next) => {
    await userControllers.deleteUser({ req, res, next })
  })

  app.use("/user", routerUser)
}

