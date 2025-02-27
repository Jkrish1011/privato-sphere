import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

/*
ARCHITECTURE
-------------
MVC based model
MODEL - MONGODB
VIEW - REACT
CONTROLLER - NODEJS/EXPRESS
*/


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", 'PATCH', "DELETE"],
    credentials: true, // to enable cookies, we need credentials!
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connect(databaseURL).then(()=>console.log(`DB Connection successful!`)).catch(err=>console.error(err.message));