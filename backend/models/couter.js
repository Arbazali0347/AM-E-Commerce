import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true},
  seq: { type: Number, default: 100 } // start 100, so pehla hoga 101
});

export default mongoose.model("Counter", counterSchema);
