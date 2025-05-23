const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const translate = require("./services/translate");
const upload = require("./services/dropbox");
const path = require("path");


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.post("/translate", async (req, res) => {
  const { text, lang } = req.body;
  try {
    const translatedText = await translate(text, lang);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: "Eroare la traducere." });
  }
});

app.post("/upload", async (req, res) => {
  const { filename, content } = req.body;
  try {
    const response = await upload(filename, content);
    res.json({ message: "Fișier încărcat!", url: response });
  } catch (error) {
    res.status(500).json({ error: "Eroare la încărcare Dropbox." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});
