const { Router } = require("express");
const Order = require("../model/order");
const jwt = require("jsonwebtoken");
const key = "is author Ewower";
const router = Router();
router.post("/add", async (req, res) => {
  let { token } = req.cookies;
  const id = jwt.verify(token, key);
  let order = new Order({
    id: id.id,
    basket: req.body.basket,
    date: new Date(),
  });
  await order.save();
  res.status(200);
});
module.exports = router;
