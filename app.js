import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import indexRouter from "./routes/indexRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import itemRouter from "./routes/itemRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT | 3000;
app.use(urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/items", itemRouter);
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
