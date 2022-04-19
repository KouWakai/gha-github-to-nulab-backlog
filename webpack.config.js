const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: { app: "./index.js" },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
};