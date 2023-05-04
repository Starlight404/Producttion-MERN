import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//configure env
dotenv.config();

//databse config
connectDB();

// Esmodule Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./shoe/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./shoe/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
	res.send("<h1>Welcome to Ecom</h1>");
});

//run listen
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`.bgCyan.white);
});

