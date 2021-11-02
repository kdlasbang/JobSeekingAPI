const mysql = require('mysql');
const dbConfig = require("./config/db.config.js");
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.DB
});
/*
connection.connect(function(err) {
      if (err) throw err;
      connection.query("SELECT * FROM db.Applicants", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });*/

    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });
module.exports = connection;

   