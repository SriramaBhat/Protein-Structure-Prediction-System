const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");

function predictionController(req, res) {
  try {
    let aaString = req.body.aaString.trim();
    if (!aaString) {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Input is an Empty String",
      });
    } else {
      aaString = aaString.toUpperCase();
      const aaRegExp = new RegExp("^[ACDEFGHIKLMNPQRSTVWY]+$");
      if (!aaRegExp.test(aaString)) {
        res.status(200).send({
          success: true,
          status: 200,
          message: "Input is not an AA String",
        });
      } else {
        let options = {
          pythonPath:
            "E:\\ProteinStructurePrediction\\venv\\Scripts\\python.exe",
          scriptPath: path.join(__dirname + "/"),
          args: [aaString],
        };

        PythonShell.run("visualizer.py", options).then((messages) => {
          const date_string = messages[0];
          const pdb_path = date_string + "_pred.pdb";
          res.status(200).send({
            status: 200,
            success: true,
            message: "Predicted",
            pdbPath: pdb_path,
          });
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, status: 500, message: "Error on Server Side" });
  }
}

module.exports = { predictionController };
