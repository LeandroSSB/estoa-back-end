import { handleError } from "../utils/errors.js"
import { userRouter } from "./user.route.js"
import { reportRouter } from "./report.route.js"

const router = (app) => {
  userRouter(app)
  reportRouter(app)

  app.use((err,_req,res,_next) => {
    handleError({err, res})
  })
}

export default router