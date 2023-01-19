import app from './app.js'
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT


app.listen(PORT || 3000, () => {
  console.log(`Server running at port ${PORT}`)
})