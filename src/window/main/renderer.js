// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require("electron");

var select_note_sql = "select * from note";
var insert_note_sql = "INSERT INTO note (title, content) VALUES (?,?)";

document.getElementById("add").addEventListener(
  "click",
  function () {
    ipcRenderer.send(`sqlite3-run`, {
      sql: insert_note_sql,
      params: ["title", "content"],
    });
  },
  false
);

document.getElementById("list").addEventListener(
  "click",
  function () {
    ipcRenderer.send(`sqlite3-all`, {
      sql: select_note_sql,
      params: [],
    });
  },
  false
);

ipcRenderer.on("sqlite3-run-reply", (event, arg) => {
  //   run replay
});

ipcRenderer.on("sqlite3-all-reply", (event, arg) => {
  //   all replay
  if (!arg) return;
  switch (arg.sql) {
    case select_note_sql:
      // display list
      document.getElementById("view_list").innerHTML = JSON.stringify(
        arg.data || []
      );
      break;
    default:
      break;
  }
});
