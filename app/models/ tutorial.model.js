const sqlite3 = require("sqlite3");
const dbPath = require("../config/db").databasename;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error while creating the Database..!");
  } else {
    console.log("Database Created Successfully..!");
  }
});
const title = "book1";
const query = `SELECT * FROM tutorials where title LIKE "%${title}%"`;
console.log(query);

db.all(query, [], (err, data) => {
  if (err) {
    console.log("Error while inserting the data..!");
  } else {
    console.log(data);
  }
});
//For selecting the particular record 
exports.getAll = (title, callback) => {
  let query = `SELECT * FROM tutorials where title LIKE "%${title}%"`;
  if (!title) {
    query = `SELECT * FROM tutorials`;
  }
  db.all(query, [], (err, data) => {
    if (err) {
      console.log("error:", err);
      callback(null, err);
      return;
    }
    callback(null, data);
  });
};

//Selecting all the published records 
exports.getAllPublished = (callback) => {
  const query = `SELECT * FROM tutorials where published=1`;
  db.all(query, [], (err, data) => {
    if (err) {
      console.log("error:", err);
      callback(null, err);
      return;
    }
    callback(null, data);
  });
};

//Selecting the record based on the id
exports.getOne = (id, callback) => {
  const query = "SELECT * FROM tutorials  WHERE id=?";
  db.all(query, [id], (err, data) => {
    if (err) {
      callback(null, err);
      return;
    }
    console.log(data);
    callback(null, data);
  });
};

//Deleting the particular record based on the id
exports.delete = (id, callback) => {
  const query = "DELETE FROM tutorials  WHERE id=?";
  db.run(query, [id], (err) => {
    if (err) {
      callback(null, err);
      return;
    }
    callback(null, { message: "The Tutorial was deleted successfully..!" });
  });
};

//Deleting all the records present in the table
exports.deleteAll = (callback) => {
  const query = "DELETE FROM tutorials";
  db.run(query, [], (err) => {
    if (err) {
      callback(null, err);
      return;
    }
    callback(null, { message: "All Tutorial were deleted successfully..!" });
  });
};

//Creating the new row.
exports.create = (data, callback) => {
  const query = `INSERT INTO  tutorials (title,description,published) VALUES (?,?,?)`;
  db.run(query, data, function (err) {
    if (err) {
      callback(err, null);
    }
    const selectQuery = "SELECT * FROM tutorials WHERE id =?";
    db.all(selectQuery, [this.lastID], (err, data) => {
      if (err) {
        callback(null, err);
      }
      callback(null, data);
    });
  });
};

//Updating the particular row based on the id
exports.update = (data, callback) => {
  const query = `UPDATE tutorials SET title=?,description=?,published=? WHERE id=?`;
  db.run(query, data, function (err) {
    if (err) {
      callback(err, null);
    }

    if (this.changes === 0) {
      callback(null, { message: "No row found with the given ID" });
      return;
    }
    const selectQuery = "SELECT * FROM tutorials WHERE id =?";
    db.all(selectQuery, data.at(-1), (err, data) => {
      if (err) {
        callback(null, err);
      }
      callback(null, data);
    });
  });
};
