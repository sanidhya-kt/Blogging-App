const express = require("express");
const path = require("path");
const app = express();
const connectDatabase = require("./config/db");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blogModels")

const dotenv = require("dotenv");
const { checkForAuthCookie } = require("./middleware/authentication");
dotenv.config({ path: "config/.env" });
const Port = process.env.PORT || 1000;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve('./public')));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute); // route register
app.use("/blog", blogRoute);

app.get("/", async(req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlog, 
  });
});

connectDatabase();

app.listen(Port, () => {
  console.log(`Server started at port ${Port}`);
});
