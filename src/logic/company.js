const Model = require("../model/company");
class Logic {
  async add(req, res) {
    const { title, address, image, contactPerson, phone, citiesSale, type } = req.body;
    const model = new Model({
      title: title,
      address: address,
      logo: image,
      contactPerson: contactPerson,
      phone: phone,
      citiesSale: citiesSale,
      type: type,
    });
    if (image) console.log("1");
    await model.save();
    return res.send(true);
  }
  async get(req, res) {
    const model = await Model.find({});
    return res.json(model);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const model = await Model.findById(id);
    return res.json(model);
  }
  async delet(req, res) {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    return res.send(true);
  }

  async update(req, res) {
    await Model.findByIdAndUpdate(req.params.id, { ...req.body });
    return res.send(true);
  }
}
module.exports = new Logic();
