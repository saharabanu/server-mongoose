const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const product = model("Product", productSchema);
module.exports = product;
