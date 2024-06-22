import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import multer from "multer";
// const upload = multer();

const app = Express();
// app.use(upload.array());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  Express.json({
    // this is for , when data is coming from "form"
    limit: "16kb",
  })
);

app.use(
  Express.urlencoded({
    // this is for , when data is coming from "url"
    extended: true,
    limit: "16kb",
  })
);

app.use(Express.static("Public")); // when we need to store files/imgs/pdfs in locall machine we can put them inside public folder

app.use(cookieParser()); // so that we can do CRUD operations over cookies

import userRouter from "./routes/user.route.js";
import teamRouter from "./routes/team.route.js";

app.get("/", (req, res) => {
  res.send("welcome to the home directory");
});

app.use("/api/users", userRouter);
app.use("/api/teams", teamRouter);

export { app };
