// Import MySQL connection.
var connection = require("../config/connection.js");


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num.length; i++) {
    arr.push("?");
  }

  return arr.toString();
}

 
function objToSql(ob) {
  var arr = [];

   // create a for loop
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

 
  return arr.toString();
}

 
var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function(table, columns, values, cb) {
    var queryString = `INSERT INTO ${table} (${columns.toString()}) VALUES (${printQuestionMarks(values)});`;

    console.log(queryString);

    connection.query(queryString, values, function(err, result){
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  deleteOne: function(table, condition, cb) {
    var queryString = `DELETE FROM ${table} WHERE ${condition}`;
    
    console.log(queryString);
    
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      
      cb(result);
    });
  }

};

module.exports = orm;
