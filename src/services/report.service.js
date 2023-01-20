import { ErrorHandler } from "../utils/errors.js"
import pdfGenerate from "../utils/pdfGenerate.js"
import prisma from "./../database/index.js"
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createReport = async (data) => {
 
    const user = await prisma.user.findUnique({where: {id: data.user_id}})
    console.log(user);
    if(!user?.email) throw new ErrorHandler({ statusCode: 404, message: "User not found"})

    delete user.id
    delete user.password


    const dataPdf = {
      ...data,
      ...user
    }
    console.log(dataPdf)
    const filePath = pdfGenerate(dataPdf)
    
    const report = await prisma.report.create({
      data:{
        url_doc: filePath,
        title: data.title,
        user_id: data.user_id,
      }
    })

    return report
  
}

export const getReport = async ({id}) => {
  try{
    if (!id) return await prisma.report.findMany()
    
    const report = await prisma.report.findUnique({ where: {id: id}})

    return report 
  }catch(err){
    throw new ErrorHandler({statusCode: 404, message: "Report not found"})
  }
}

export const updateReport = async ({id, req, data}) => {
  const report = await prisma.report.findUnique({ where: {id: id}})
  if (!report?.id) throw new ErrorHandler({statusCode: 404 , message: "report not found"})

  if(!req.auth.id == report.user_id || !req.auth.type) {
    throw new ErrorHandler({statusCode: 401 , message: "you dont have permission to update this report"})
  }

  const updatedReport = await prisma.report.update({
    where: {
      id
    },
    data: {
      updated_at: new Date().toJSON(),
      ...data
    },
    include: {
      user: true
    }
  })

  delete updatedReport.user.password 
  pdfGenerate({
    email: updatedReport.user.email,
    name: updatedReport.user.name,
    phoneNumber: updatedReport.user.phoneNumber,
    type: updatedReport.user.type,
    title: updatedReport.title
  })

  return updatedReport
}

export const deleteReport = async ({id, req, res}) => {

  const report = await prisma.report.findUnique({ where: {id: id}})
  if(!report?.title) throw new ErrorHandler({ statusCode: 404, message: "Report not found"})
  if(req.auth.id != report?.user_id || !req.auth.type) {
    throw new ErrorHandler({statusCode: 401 , message: "you dont have permission to delete this report"})
  }


  fs.unlink(report.url_doc, (err) => {
    if(err) throw new ErrorHandler({statusCode: 500, message: "file not found"})
  })
  // await prisma.report.delete({
  //   where: {
  //     id: report.id
  //   }
  // })

  await prisma.report.update({
    where: {
      id: report.id
    },
    data: {
      deleted_at: new Date().toJSON(),
    }
  })
}

export const getPdf = async ({id, req,res}) => {
  const report = await prisma.report.findUnique({where: { id }, include: {user: true}})
  if (!report?.title) throw new ErrorHandler({statusCode: 404, message: "Report not found"})
  if(!req.auth.id == report.user_id || !req.auth.type) {
    throw new ErrorHandler({statusCode: 401 , message: "you dont have permission to get this report pdf"})
  }

   fs.readFile(report.url_doc, (err, data) => {
    if (err) {
        throw new ErrorHandler({statusCode: 404, message: "file not found"})
    }
    res.contentType("application/pdf");
    res.send(data)
});
}