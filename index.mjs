import express from "express";
import dotenv from "dotenv";
import routers from "./routes/routes.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";


const env = dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(routers);
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
