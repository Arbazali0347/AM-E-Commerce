import mongoose from "mongoose";

const bulkDealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const BulkDeal = mongoose.model("BulkDeal", bulkDealSchema);

export default BulkDeal;
