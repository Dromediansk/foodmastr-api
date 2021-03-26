import { handleLogout } from "./controllers/Logout";
import { Records } from "./models/Records";
import { requireAuth } from "./middlewares/auth";
import { AppRouter } from "./AppRouter";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { loginAuthentication } from "./controllers/Login";
import { handleRegister } from "./controllers/Register";
import {
  handleRecordAdd,
  handleRecordDelete,
  handleRecordsGet,
} from "./controllers/Records";

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
app.post("/logout", requireAuth, (req, res) => {
  handleLogout(req, res);
});

// records
app.get("/expenses/:userId", requireAuth, (req, res) => {
  handleRecordsGet(req, res, Records.EXPENSE);
});
app.get("/incomes/:userId", requireAuth, (req, res) => {
  handleRecordsGet(req, res, Records.INCOME);
});

app.post("/expenses/:userId", requireAuth, (req, res) => {
  handleRecordAdd(req, res, Records.EXPENSE);
});
app.post("/incomes/:userId", requireAuth, (req, res) => {
  handleRecordAdd(req, res, Records.INCOME);
});

app.delete("/expenses/:userId", requireAuth, (req, res) => {
  handleRecordDelete(req, res, Records.EXPENSE);
});
app.delete("/incomes/:userId", requireAuth, (req, res) => {
  handleRecordDelete(req, res, Records.INCOME);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
