import { Router } from "express"
import { autorizeMiddleware, validate} from "./../middlewares/index.js"
import { reportControllers } from "./../controller/index.js"
import { reportSchemas } from "./../models/index.js"

export const reportRouter = (app) => {
  const router = Router()

  router.get("/:id", async ( req,res,next ) => {
    await reportControllers.getReport({ req, res, next })
  })

  router.get("", async ( req,res,next ) => {
    await reportControllers.getReport({ req, res, next })
  })

  router.post("", validate(reportSchemas.reportSchema), autorizeMiddleware,  async (req, res, next ) => { 
    await reportControllers.createReport({ req, res, next })
  })

  router.patch("/:id",validate(reportSchemas.reportSchemaOpcional), autorizeMiddleware,  async (req, res, next) => {
    await reportControllers.updateReport({ req, res, next})
  })

  router.delete("/:id", autorizeMiddleware , async (req, res, next) => {
    await reportControllers.deleteReport({ req, res, next})
  })

  router.get("/pdf/:id", autorizeMiddleware, async (req, res, next) => {
    await reportControllers.getPdfReport({ req, res, next})
  })

  app.use("/report", router)
}

