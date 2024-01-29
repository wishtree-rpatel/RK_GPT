import mongoose from "mongoose"
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"
connectToDatabase()

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("DB connected and APP is open on port 5000")
  })
})





