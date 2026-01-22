import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routers from "./routes/routes.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";


dotenv.config();
const app = express();

const mongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected successfully");

    }catch(error){
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
}
mongoDB();

// middlewares
app.use(express.json());
app.use("/api/", routers);
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
