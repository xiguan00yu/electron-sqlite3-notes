const { ipcMain } = require("electron");
const sqlite3 = require("../lib/sqlite3");

const supportFuncs = ["run", "all"];

// for inject ipc support sqlite3
supportFuncs.forEach((func) => {
  const onChannel = `sqlite3-${func}`;
  const replyChannel = `${onChannel}-reply`;
  ipcMain.on(onChannel, (event, arg) => {
    const { sql, params } = arg;
    sqlite3[func] &&
      sqlite3[func](sql, params, (err, data) => {
        event.reply(replyChannel, { err, data, sql });
      });
  });
});
