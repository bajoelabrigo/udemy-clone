import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
