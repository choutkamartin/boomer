import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  said: {
    type: Boolean,
  },
});

export default mongoose.models.Word || mongoose.model("Word", WordSchema);
