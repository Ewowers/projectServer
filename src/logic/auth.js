const User = require("../model/user");
const jwt = require("jsonwebtoken");
const key = "is author Ewower";
const generateToken = (id, status) => {
  const payload = { id };
  return jwt.sign(payload, key, { expiresIn: "168h" });
};
class logick {
  async authorization(req, res) {
    let { login, password } = req.body;
    let candidate = await User.findOne({ login });
    console.log(candidate.position === "nouser");
    if (!candidate) return res.json({ status: false, message: "Логин не варный" });
    if (candidate.password !== password) return res.json({ status: false, message: "Пороль не верный" });
    if (candidate.position === "nouser") return res.json({ status: false, message: "Ваша заявка расматривается" });
    if (candidate.position === "user") {
      return res.cookie("token", generateToken(candidate._id)).json({ status: true, url: "user" });
    }
    return res.cookie("token", generateToken(candidate._id)).json({ status: true, url: "admin" });
  }
  async register(req, res) {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) return res.json({ message: "Данный логин занят" });

    try {
      let user = new User({
        login: login,
        password: password,
        position: "nouser",
        important: 0,
      });
      await user.save();
      return res.json({ status: true });
    } catch (err) {
      console.log(err);
    }
  }
  async getUser(req, res) {
    let { id } = req.params;
    let user = await User.findById(id);
    return res.json(user);
  }
  async getPesonalInfo(req, res) {
    const { token } = req.cookies;
    try {
      const tokenInfo = jwt.verify(token, key);
      const user = await User.findById(tokenInfo.id);
      return res.json(user);
    } catch (e) {
      console.log("опипка");
      console.log(e);
    }
  }
  async personalInfo(req, res) {
    let { email, phone, year, image } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      email: email,
      phone: phone,
      year: year,
      image: image,
    });
    return res.json({ id: req.params.id });
  }
  async get(req, res) {
    let { status } = req.params;
    let users;
    if (status !== "all") users = await User.find({ position: status });
    else users = await User.find({});
    console.log("get/user");
    return res.json(users);
  }
  async deletes(req, res) {
    let user = await User.findByIdAndDelete(req.params.id);
    return res.json(user);
  }
  async update(req, res) {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body });
    return res.json(user);
  }
  async test(req, res) {
    let { token } = req.cookies;
    if (!token) return res.json({ status: false });
  }
  async out(req, res) {
    res.clearCookie("token").send(true);
  }
  async onload(req, res) {
    let admin = await User.findOne({ login: "admin" });
    if (!admin) {
      new User({
        login: "admin",
        password: "admin",
        position: "admin",
        important: 5,
      }).save();
    }

    if (!req.cookies.token) return res.json({ status: false, eror: "no token" });
    try {
      const { token } = req.cookies;
      const candidate = jwt.verify(token, key);
      const user = await User.findById(candidate.id);
      if (!user) return res.json({ status: false, eror: "error" });
      if (user.position === "user") return res.json({ status: true, url: "/user" });
      if (user.position === "nouser") {
        return res.json({ status: false, message: "Администрация расматривается вашу заявку" });
      }
      return res.json({ status: true, url: "/admin" });
    } catch {}
  }
}
module.exports = new logick();
