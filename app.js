import express, { urlencoded } from "express"
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import {messageController} from "./controllers/messageController.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const PORT = process.env.PORT | 3000
app.use(urlencoded({ extended: false }))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", async function(req, res) {
    const { rows } = await messageController();
    const { message } = rows[0]
    res.render("index", { message: message })
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`))
