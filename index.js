const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/callback", (req, res) => {
  const { query, params, body } = req;

  const output = { query, params, body };

  console.log(JSON.stringify(output, null, 2));

  res.status(200).json({ message: "OK" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
