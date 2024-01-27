const mongoose = require("mongoose");
const string = process.env.URI_STRING || "mongodb+srv://";
mongoose.connect(string);

/* schema start here*/

const clientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

// service schema and projects schema is same

const servicesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 }, // 1 means super admin, 2 means user with edit access, 0 means normal user
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
  },
  {
    query: {
      all() {
        return this.where({});
      },
      byRole(role) {
        return this.where({ role });
      },
      byEmail(email) {
        return this.where({ email });
      },
      byIdEmail(_id, email) {
        return this.where({ _id, email });
      },
      byEmailPassword(email, password) {
        return this.where({ email, password });
      },
    },
  }
);

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: Number, required: true },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

// create and export the model
const Project = mongoose.model("projects", servicesSchema);
const Service = mongoose.model("services", servicesSchema);
const Client = mongoose.model("clients", clientSchema);
const User = mongoose.model("users", userSchema);
const Message = mongoose.model("messages", messageSchema);

// validations for the models

User.schema.path("name").validate({
  validator: function (value) {
    if (value && value.length > 0) {
      return true;
    }
    return false;
  },
  message: "Name required",
});

User.schema.path("email").validate({
  validator: function (value) {
    var tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return value && tester.test(value);
  },
  message: "Enter a valid email!",
});

User.schema.path("email").validate({
  validator: async (value) => {
    const count = await User.findOne({ email: value }).count();
    return count === 0;
  },
  message: "Email already exist",
});

Project.schema.path("title").validate({
  validator: function (value) {
    return value.length > 0;
  },
  message: "title required",
});

Message.schema.path("name").validate({
  validator: function (value) {
    return value.length > 2;
  },
  message: "name required",
});

Message.schema.path("email").validate({
  validator: function (value) {
    var tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return value && tester.test(value);
  },
  message: "enter valid email!",
});

Message.schema.path("message").validate({
  validator: function (value) {
    return value.length > 10;
  },
  message: "Message minimum length should be 10 characters",
});

Message.schema.path("phone").validate({
  validator: function (value) {
    return value.toString().length === 10;
  },
  message: "phone number must be of 10 digit",
});

module.exports = { Project, Service, Client, User, Message };
