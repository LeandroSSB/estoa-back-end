import { handleError } from "../utils/errors.js"
import { userRouter } from "./user.route.js"

const router = (app) => {
  userRouter(app)

  app.use((err,_req,res,_next) => {
    handleError({err, res})
  })
}

export default router