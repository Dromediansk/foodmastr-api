import express from "express";
import cors from "cors";
import { loginAuthentication } from "./controllers/Login";
import { handleRegister } from "./controllers/Register";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// controllers
app.get("/", (req, res) => res.send("It's working!"));
app.post("/login", loginAuthentication());
app.post("/register", (req, res) => {
  handleRegister(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
