const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config({ path: "./config/.env" });

// to get data use app.use as a middleware

app.use(express.json());

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

mongoose
  .connect(
    "mongodb+srv://DevZeroOne:DevZeroOne@cluster0.2kdey3p.mongodb.net/DemoProject?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("database started");
  })
  .catch((err) => {
    console.log("database error" + err);
  });

const port = process.env.PORT || 8000;
app.listen(process.env.PORT, () => {
  console.log("app server is running", port);
});
