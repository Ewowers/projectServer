const router = require("express").Router();
const logic = require("../logic/company");

router.get("/", logic.get);
router.get("/getOne/:id", logic.getOne);
router.post("/add", logic.add);
router.delete("/:id", logic.delet);
router.put("/:id", logic.update);
module.exports = router;
