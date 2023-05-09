const express = require("express");
const { conversionController } = require("./dna_to_aa_conversion/converter");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

router.get("/", (req, res) => {
  res
    .status(200)
    .send({ success: true, status: 200, message: "Request received" });
});
router.post("/dna-to-aa", conversionController);

var port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port));
