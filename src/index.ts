import { Records } from "./models/Records";
import { requireAuth } from "./middlewares/auth";
import { AppRouter } from "./AppRouter";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { loginAuthentication } from "./controllers/Login";
import { handleRegister } from "./controllers/Register";
import { handleRecordsGet } from "./controllers/Records";

const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

// controllers
app.get("/", (req, res) => res.send("It's working!"));

// auth
app.post("/login", loginAuthentication());
app.post("/register", (req, res) => {
  handleRegister(req, res);
});

app.get("/expenses/:userId", requireAuth, (req, res) => {
  handleRecordsGet(req, res, Records.EXPENSE);
});
app.get("/incomes/:userId", requireAuth, (req, res) => {
  handleRecordsGet(req, res, Records.INCOME);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
