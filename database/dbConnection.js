import { connect } from "mongoose";

export const dbConn = connect(process.env.DB_URI)
  .then(() => {
    console.log("server connected successfully...");
  })
  .catch(() => {
    console.log("error database connection!");
  });
