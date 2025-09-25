import BulkDeal from "../models/BulkDeal.js";

// create new bulk deal request
export const createBulkDeal = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newDeal = new BulkDeal({ name, phone });
    await newDeal.save();

    res.status(201).json({
      success: true,
      message: "Bulk deal request submitted successfully",
      data: newDeal,
    });
  } catch (error) {
    console.error("Create Bulk Deal Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get all bulk deals (for admin panel)
export const getAllBulkDeals = async (req, res) => {
  try {
    const deals = await BulkDeal.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: deals });
  } catch (error) {
    console.error("Get Bulk Deals Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ❌ delete bulk deal
export const deleteBulkDeal = async (req, res) => {
  try {
    const { id } = req.body;
    await BulkDeal.findByIdAndDelete(id);
    res.json({ success: true, message: "Deal deleted successfully" });
  } catch (error) {
    console.error("Delete Bulk Deal Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
