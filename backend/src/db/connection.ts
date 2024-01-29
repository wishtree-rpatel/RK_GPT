import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        throw new Error("Error while connecting to database", error)
    }
}
async function disconnect() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        throw new Error("Error while dis-connectiong to database")
    }
}

export { connectToDatabase, disconnect }