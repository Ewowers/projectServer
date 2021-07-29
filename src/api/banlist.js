const { Router } = require("express");
const User = require("../model/user");
const Model = require("../model/banlist");
const router = Router();
router.get("/", async (req, res) => {
  let model = await Model.find();
  res.json(model);
});
router.post("/add", async (req, res) => {
  let { id } = req.body;
  let user = await User.findById(id);
  await User.findByIdAndUpdate(id, { ban: true });
  const model = new Model({
    ip: user.ip,
    account: user,
  });
  await model.save();
  res.send(true);
});
router.delete("/:id", async (req, res) => {
  let user = await Model.findById(req.params.id);
  await User.findByIdAndUpdate(user.account._id, { ban: false });
  await Model.findByIdAndDelete(req.params.id);
  res.send(true);
});
module.exports = router;
