const bcrypt = require("bcrypt");

const User = require("../models/user");

async function encrypt_password(user) {
  const salt = await bcrypt.genSalt();
  user.password_hash = await bcrypt.hash(user.password, salt);

  delete user.password;

  return user;
}

module.exports.getAll = async () => {
  return await User.find().sort({ _id: 1 }).exec();
};

module.exports.getOne = async (user_id) => {
  return await User.findOne({ _id: user_id }).exec();
};

module.exports.getOneEmail = async (email) => {
  return await User.findOne({ email: email }).exec();
};

module.exports.create = async (user) => {
  try {
    const encrypt_user = await encrypt_password(user);

    return await User.create(encrypt_user);
  } catch (error) {
    if (error.code === 11000 && /email/.test(error.errmsg))
      throw Error("The given email is already in use.");

    throw error;
  }
};

module.exports.updatePassword = async (user_id, user) => {
  const encrypt_user = await encrypt_password(user);

  return User.updateOne({ _id: user_id }, encrypt_user);
};

module.exports.update = async (user_id, user) => {
  return User.updateOne({ _id: user_id }, user);
};

module.exports.delete = (user_id) => {
  return User.deleteOne({ _id: user_id });
};
