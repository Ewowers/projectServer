const Product = require("../model/product");
class Logic {
  async add(req, res) {
    let { title, prise, type, image } = req.body;
    let candidat = await Product.findOne({ title });
    if (candidat) return res.json({ status: false });
    let product = new Product({
      title: title,
      prise: prise,
      type: type,
      image: image,
    });
    await product.save();
    return res.json({ status: true });
  }

  async get(req, res) {
    const { type } = req.params;
    let product;
    if (type === "all") product = await Product.find();
    else product = await Product.find({ type: type });
    return res.json(product);
  }
}

module.exports = new Logic();
