import { ErrorHandler } from "../utils/errors.js";
import { reportServices } from "./../services/index.js"



export const createReport = async({req, res, next}) => {
  try{
    const report = await reportServices.createReport(req.body)
    res.status(201).send(report)
  }catch(e){
    next(e);
  }
}

export const getReport = async({req, res, next}) => {
  try{
    const report = await reportServices.getReport({ id: Number(req.params.id)})
    res.send(report)
  }catch(e){
    next(e)
  }
}

export const updateReport = async({req, res, next}) => {
  try{
    if(!req.body) throw new ErrorHandler({statusCode: 400, message: "Request cannot be empty" })
    const report = await reportServices.updateReport({id: Number(req.params.id), req, data: req.body })
    res.send(report)
  }catch(e){
    next(e)
  }
}

export const deleteReport = async({req, res, next}) => {
  try{
    await reportServices.deleteReport({id: Number(req.params.id), req})
    res.sendStatus(204)
  }catch(e){
    next(e)
  }
}

export const getPdfReport = async ({req, res, next}) => {
  try {
    await reportServices.getPdf({id: Number(req.params.id), req, res})
  }catch(e){
    next(e)
  }
}