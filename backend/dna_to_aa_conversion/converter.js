// const spawn = require("child_process").spawn;
const { PythonShell } = require("python-shell");
const path = require("path");
function conversionController(req, res) {
  try {
    let dnaString = req.body.dnaString.trim();
    if (!dnaString) {
      res
        .status(200)
        .send({ success: true, status: 200, message: "Input is an Empty String", rnaString: null });
    } else {
      dnaString = dnaString.toUpperCase();
      dnaRegExp = new RegExp("^[ACGT]+$");
      if (!dnaRegExp.test(dnaString)) {
        res
          .status(200)
          .send({ success: true, status: 200, message: "Input is not a DNA String", rnaString: null });
      } else {
        let rnaString = "";
        let aaString = "";
        let options = {
          scriptPath: path.join(__dirname + "/"),
          args: [dnaString],
        };
        PythonShell.run("rnaConversion.py", options).then((messages) => {
          rnaString = messages[0];
          res.status(200).send({
            success: true,
            status: 200,
            message: "RNA done",
            rnaString: rnaString,
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { conversionController };
