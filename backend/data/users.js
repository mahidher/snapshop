import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "miracle",
    email: "miracle@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "notail",
    email: "notail@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
