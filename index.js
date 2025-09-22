const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const pathaoWebhookSecret = process.env.PATHAO_WEBHOOK_SECRET;

if (!pathaoWebhookSecret) {
  console.error("❌ PATHAO_WEBHOOK_SECRET not found in environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/callback/pathao", (req, res) => {
  const { query, params, body } = req;

  const output = { query, params, body };
  console.log(JSON.stringify(output, null, 2));

  res
    .status(202)
    .set("X-Pathao-Merchant-Webhook-Integration-Secret", pathaoWebhookSecret)
    .json({ message: "Accepted" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
