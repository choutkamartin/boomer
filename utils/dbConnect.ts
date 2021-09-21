import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI proměnná není definována.");
}

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
};

async function dbConnect() {
  mongoose.connect(MONGODB_URI, opts);
}

export default dbConnect;
