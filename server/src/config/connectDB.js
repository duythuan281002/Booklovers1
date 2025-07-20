// const { Sequelize } = require("sequelize");

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize("storethuan", "root", null, {
//   host: "localhost",
//   dialect: "mysql",
// });

// let connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// module.exports = connectDB;

// configs/connectDB.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // hoặc mật khẩu
  database: "bookstore", // ví dụ bookstore
});

export default pool;
