const { Router } = require("express");
const logic = require("../logic/auth");
const router = Router();
router.post("/authorization", logic.authorization);
router.post("/register", logic.register);
router.get("/get/:status", logic.get);
router.get("/user/:id", logic.getUser);
router.post("/getPesonalInfo", logic.getPesonalInfo);
router.put("/personalInfo/:id", logic.personalInfo);
router.put("/:id", logic.update);
router.post("/onload", logic.onload);
router.delete("/:id", logic.deletes);
router.get("/test", logic.test);
router.post("/out", logic.out);
module.exports = router;
