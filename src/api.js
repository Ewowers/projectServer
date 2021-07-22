const { Router } = require("express");
const auth = require("./api/auth");
const product = require("./api/product");
const router = Router();
router.use("/auth", auth);
router.use("/product", product);
router.use("/personal", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
module.exports = router;
