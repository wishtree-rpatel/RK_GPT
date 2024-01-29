import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import router from "./routes/index-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// it's for logging 
app.use(morgan("dev"));
app.use("/api/v1", router);
export default app;
//# sourceMappingURL=app.js.map