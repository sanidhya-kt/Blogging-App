const crypto = require("node:crypto");
const { Schema, model } = require("mongoose");
const {createTokenForUser} = require("../utils/auth")

const userRole = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/defaultimage.png",
    },
    role: {
      type: String,
      enum: Object.values.userRole, // object.values() method will extract all value from userRole as an array and we can only use these value.
      default: userRole.USER,
    },
  },
  { timestamps: true }
);
// this feature a pre saved hook that automatic hash user password before saving it to db.
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .createHmac("sha512", salt) // algorithm : sha512
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

// virtual function , we are comparing the hashed of hashedPassword with userProvidedHashed
userSchema.static(
  "matchedPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("user not found!.....");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHashed = crypto
      .createHmac("sha512", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHashed)
      throw new Error("email and password is not correct");

    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("user", userSchema);
module.exports = User;
