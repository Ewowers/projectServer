const { Router } = require("express");
const logic = require("../logic/product");
const router = Router();
router.post("/add", logic.add);
router.get("/get/:type", logic.get);
module.exports = router;
