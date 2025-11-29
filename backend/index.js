import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "4e7d051b-46da-4856-8496-92162bf85929",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use((req, res, next) => {
  res.locals.admin = req.session?.user?.admin || false;
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor a correr em http://localhost:${PORT}`)
);
