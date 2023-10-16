import mongoose  from "mongoose";

import app from "./app.js";

const { DB_HOST, PORT = 4000 } = process.env;


mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(4000, (req) => {
      console.log("Database connection successful. Port 4000");
    });
})
  .catch(error => {
    console.log(error.message);
    process.exit(1);
})

