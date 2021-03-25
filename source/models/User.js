const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Solution = require('./Solution');

//Schemat użytkownika w bazie danych
const userSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true, trim: true, unique: true },
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error('User.js, validate(email), Email is invalid');
        } else validator.normalizeEmail(email);
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(password) {
        if (
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw new Error('Password is invalid');
        }
      },
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true },
);

//Haszowanie hasła za pomocą hooka tuż przed jego zapisaniem do bazy danych
userSchema.pre('save', async function (next) {
  //jeżeli hasło zostało zmodyfikowane/utworzone, haszujemy
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, parseInt(process.env.SALT_LENGTH));
  }
  next();
});

//Kasowanie wszystkich rozwiazan usuwanego uzytkownika
userSchema.pre('remove', async function (next) {
  await Solution.deleteMany({ createdBy: this._id });
  next();
});

//Wyszukiwanie na podstawie emaila oraz hasła
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Bad e-mail or password has been provided.');
  const isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) throw new Error('Bad e-mail or password has been provided.');
  return user;
};

//Generowanie tokenu uwierzytelniania
userSchema.methods.generateToken = async function () {
  const token = jsonwebtoken.sign({ _id: this._id.toString() }, toString(process.env.TOKEN_KEY), {
    expiresIn: '7 days',
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

//Przy zwracaniu użytkowników nie chcemy aby widać było hasło lub tokeny uwierzytelniania
userSchema.methods.toJSON = function () {
  const userOBJ = this.toObject();
  //delete userOBJ.password;
  //delete userOBJ.tokens;
  delete userOBJ.updatedAt;
  delete userOBJ.__v;
  return userOBJ;
};

//Model użytkownika
const User = mongoose.model('User', userSchema);

module.exports = User;
