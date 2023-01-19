import express from "express";
import cors from "cors";
import route from "./routes/index.js";



const app = express([cors(), express.json()]);

route(app)

export default app