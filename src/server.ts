import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Gift Shop is running on Port: ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
