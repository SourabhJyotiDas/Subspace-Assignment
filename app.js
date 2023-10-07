import express from "express";
import ErrorMiddleware from "./middleware/error.js";
import blog from "./routes/blog.js"
import ErrorHandler from "./utils/error.js";

const app = express()
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use(blog)


app.use(ErrorMiddleware);

export default app;