const express = require("express");
const app = express();
const cors = require("cors");
const { generalLimiter } = require("./middleware/rateLimiters");

app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(generalLimiter);

const auth = require("./routes/auth");

app.use("/auth", auth);

app.set("trust proxy", 1);

app.listen(3333, () => {
  console.log(`Rodando na porta 3333`);
});