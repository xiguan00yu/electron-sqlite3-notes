const sqlite3 = require("../../lib/sqlite3");

sqlite3.addConnectListener(() => {
  const createdNoteSQL = `CREATE TABLE note (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title text, 
      content text
    )`;

  sqlite3.run(createdNoteSQL, (err) => {
    if (err) {
      // Table already created
      console.log("note Table already created,");
    } else {
      // Table just created, creating some rows
      console.log("note Table just created,");
    }
  });
});
