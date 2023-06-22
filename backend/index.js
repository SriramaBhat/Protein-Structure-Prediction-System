const express = require("express");
const fs = require("fs");
const { conversionController } = require("./dna_to_aa_conversion/converter");
const {
  predictionController,
} = require("./protein_structure_prediction/prediction");
const cors = require("cors");
const path = require("path");

const app = express();
const router = express.Router();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use(
  "/",
  express.static(
    path.join(__dirname, "protein_structure_prediction/", "plots/")
  )
);

router.get("/", (req, res) => {
  res
    .status(200)
    .send({ success: true, status: 200, message: "Request received" });
});

router.get("/getdata/:path", (req, res) => {
  fileId = `./protein_structure_prediction/plots/${req.params.path}`;
  fs.readFile(fileId, { encoding: "utf8" }, function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

router.post("/dna-to-aa", conversionController);
router.post("/aa-struct-pred", predictionController);

var port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port));
