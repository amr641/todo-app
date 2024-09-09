import { connect } from "mongoose";

export const dbConn = connect("mongodb://localhost:27017/todo")
  .then(() => {
    console.log("server connected successfully...");
  })
  .catch(() => {
    console.log("error database connection!");
  });
