const sqlite3 = require("sqlite3");
const dbPath = "../config/database.db";
const path = require("path");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    //console.error("Error while creating the Database..!");
  } else {
    console.log("Database Created Successfully..!");
  }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tutorials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT 0
)
`;
db.run(createTableQuery,(err)=>{
    if(err) {
        console.error("Error while creating teh table..!");
    } else {
        console.log("The Table had been created successfully..!");
        
    }
})
let required = path.join(__dirname,dbPath);
console.log(required);

module.exports = {databasename:required,tablename:"tutorials"}; 