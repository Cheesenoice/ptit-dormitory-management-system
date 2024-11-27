import express from "express";
import cors from "cors";
import { AdminRouter } from "./Routes/AdminRoute.js";
import { StudentRouter } from "./Routes/StudentRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { HomeRouter } from "./Routes/HomeRoute.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", AdminRouter);
app.use("/student", StudentRouter);
app.use("/home", HomeRouter);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

const verifyStudentAccess = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      if (req.params.id !== req.id.toString()) {
        return res.json({ Status: false, Error: "Unauthorized access" });
      }
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};

app.listen(8081, () => {
  console.log("Server is running");
});
