const { Router } = require("express");
const auth = require("./api/auth");
const product = require("./api/product");
const blacklist = require("./api/banlist");
const router = Router();
router.use("/auth", auth);
router.use("/product", product);
router.use("/blacklist", blacklist);
module.exports = router;
