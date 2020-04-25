const config = require("../config");

const _sqlite3 = require("sqlite3").verbose();

const connectCallbacks = [];

const sqlite3 = new _sqlite3.Database(config.sql, function (err) {
  if (err) {
    console.log("Could not connect to database", connectCallbacks.length);
    connectCallbacks.forEach((func) => func && func(err));
  } else {
    console.log("Connected to database", connectCallbacks.length);
    connectCallbacks.forEach((func) => func && func(null));
  }
});

// add connect callback
sqlite3.addConnectListener = (cb) => {
  connectCallbacks.push(cb);
};

// exports db
module.exports = sqlite3;
