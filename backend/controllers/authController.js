const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    res.json({ message: "Login Successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
