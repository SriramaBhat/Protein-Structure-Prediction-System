// const spawn = require("child_process").spawn;
const { PythonShell } = require("python-shell");
const path = require("path");
function conversionController(req, res) {
  try {
    let dnaString = req.body.dnaString.trim();
    if (!dnaString) {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Input is an Empty String",
        rnaString: null,
      });
    } else {
      dnaString = dnaString.toUpperCase();
      dnaRegExp = new RegExp("^[ACGT]+$");
      if (!dnaRegExp.test(dnaString)) {
        res.status(200).send({
          success: true,
          status: 200,
          message: "Input is not a DNA String",
          rnaString: null,
        });
      } else {
        let rnaString = "";
        let aaString = "";
        let options = {
          scriptPath: path.join(__dirname + "/"),
          args: [dnaString],
        };
        PythonShell.run("rnaConversion.py", options).then((messages) => {
          rnaString = messages[0];
          if(rnaString.length % 3 !== 0) {
            aaString = "Incorrect Length";
            res.status(200).send({
              success: true,
              status: 200,
              message: "Incorrect length",
              rnaString: rnaString,
              aaString: aaString,
            });
          }
          options = {
            scriptPath: path.join(__dirname + "/"),
            args: [rnaString],
          };
          PythonShell.run("aa_conversion.py", options).then((messages) => {
            aaString = messages[0];
            res.status(200).send({
              success: true,
              status: 200,
              message: "Converted",
              rnaString: rnaString,
              aaString: aaString,
            });
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

module.exports = { conversionController };
