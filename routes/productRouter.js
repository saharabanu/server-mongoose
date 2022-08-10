const router = require("express").Router();
const Product = require("../model/product");

// create product api
router.post("/create", async (req, res) => {
  const product = await new Product(req.body);
  const data = await product.save();
  if (data) {
    res.status(201).json({ message: "product created Successfully" });
  } else {
    res.status(501).json({ message: "Product not created, Something went wrong" });
  }
  // console.log(data);
});

// get all product api
router.get("", async (req, res) => {
  const data = await Product.find();
  if (data) {
    res.status(200).json({ message: "Product ", data });
  } else {
    res.status(404).json({ message: "Product not Found, Something went wrong" });
  }
  // console.log(data);
});
// get find same name or others product api
router.get("/findProduct", async (req, res) => {
  const data = await Product.find({ name: "dbandert" }).limit(2).select({
    _id: 0,
    created: 0,
  });
  // when we want  to find some product then we can use limit()

  // and when we want to hide some data from object or not show then we can use select({}) method
  if (data) {
    res.status(200).json({ message: "Product ", data });
  } else {
    res.status(404).json({ message: "Product not Found, Something went wrong" });
  }
  // console.log(data);
});

// find one product api
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById({ _id: id });
  if (data) {
    res.status(200).json({ message: "single Single Product", data });
  } else {
    res.status(404).json({ message: "single Single Product not Found" });
  }
  // console.log(data);
});

// update product api
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
  if (data) {
    res.status(200).json({ message: "Product Updated", data });
  } else {
    res.status(404).json({ message: "Product Not Updated" });
  }
  // console.log(data);
});

// update product without using id
router.put("/update", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const data = await Product.updateOne(
    { $set: { name: name } },
    {
      $set: { price: req.body.price },
    }
  );
  console.log(data);
  if (data) {
    res.status(200).json({ message: "Product Updated", data });
  } else {
    res.status(404).json({ message: "Product Not Updated" });
  }
  // console.log(data);
});

// delete product async function api
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = await Product.findByIdAndDelete({ _id: id }, req.body);
//   if (!data) {
//     res.status(200).json({ message: " Product Deleted", data });
//   } else {
//     res.status(404).json({ message: "Product Not  Deleted" });
//   }
//   // console.log(data);
// });

// delete product callback  function api
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete({ _id: id }, (err, data) => {
    if (!err) {
      res.status(200).json({ message: "Product Deleted", data });
    } else {
      res.status(404).json({ message: "Product Not Deleted" });
    }
  });
  // console.log(data);
});

// create many product using  in one method
router.post("/creates", async (req, res) => {
  const data = await Product.insertMany(req.body);
  // const data = await product.save();
  if (data) {
    res.status(201).json({ message: "Some products created Successfully" });
  } else {
    res.status(501).json({ message: "Some Products not created, Something went wrong" });
  }
  // console.log(data);
});

module.exports = router;
