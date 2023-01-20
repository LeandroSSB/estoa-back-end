import dotenv from "dotenv"
dotenv.config()


const config = {
  secret : process.env.SECRETJWT || "insecure",
  expiresIn : process.env.EXPIRESJWT || "30d"
}


export default config