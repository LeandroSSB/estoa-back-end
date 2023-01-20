import pdfkit from "pdfkit"
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const pdfGenerate = ({  name, email, type , phoneNumber, title }) => {

  const doc = new pdfkit()

  doc.text(`Title: ${title}`)
  doc.text(`----------------------`)
  doc.text(`Name: ${name}`)
  doc.text(`phoneNumber: ${phoneNumber}`)
  doc.text(`Email: ${email}`)
  doc.text(`IsAdmin: ${type}`)

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  

  const filePath = `${__dirname}/../database/files/pdfs/${email}.pdf`
  doc.pipe(fs.createWriteStream(filePath))
  doc.end()
  return filePath
}



export default pdfGenerate
