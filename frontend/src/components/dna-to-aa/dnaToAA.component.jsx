import { useState } from "react";
import { fetchData } from "../../utils/fetchData/Fetch";
import "./dnaToAA.styles.scss";

const defaultFormFields = {
  dnaString: "",
};

const DNAToAA = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [rnaString, setRnaString] = useState("");
  const [aaString, setAaString] = useState("");
  const [conversionMessage, setConversionMessage] = useState("");
  const { dnaString } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const dnaString = event.target.dnaString.value;
      if (dnaString.length % 3 !== 0) {
        alert("DNA not of required length");
        return;
      }
      const { data } = await fetchData(
        "http://localhost:5000/dna-to-aa",
        "POST",
        {
          dnaString: dnaString,
        }
      );
      setConversionMessage(data.message);
      setRnaString(data.rnaString);
      setAaString(data.aaString);
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="dna-to-aa-container">
      <div className="form-container">
        <h1>DNA bases to Amino Acid Sequence Converter</h1>
        <p>
          For the conversion of DNA String into a sequence of Amino Acids,
          please enter the sequences of the coding strand (5' to 3' of the DNA).
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div className="textarea-div">
            <label htmlFor="dnaString" className="form-input-label">
              DNA String (Must contain only A, T, G and C)
            </label>
            <textarea
              type="text"
              required
              name="dnaString"
              value={dnaString}
              onChange={handleChange}
              cols="75"
              rows="10"
              id="dnaString"
              className="text-inp"
            ></textarea>
          </div>
          <button type="submit" className="form-btn" onSubmit={handleSubmit}>
            Convert
          </button>
        </form>
      </div>
      {rnaString === "" ? (
        <div></div>
      ) : rnaString === null ? (
        <div className="form-container">
          <h1>Please Check the Input !!</h1>
          <p>{conversionMessage}</p>
        </div>
      ) : (
        <div className="form-container">
          <h1>RNA String</h1>
          <p>{rnaString}</p>
          {aaString === "Start Invalid" || aaString === "Stop Invalid" ? (
            <div>
              <h1>Couldn't generate Amino Acid Sequence !!</h1>
              {aaString === "Start Invalid" ? (
                <p>
                  Start Codon is not AUG, therefore, no protein will be formed.
                </p>
              ) : aaString === "Stop Invalid" ? (
                <p>
                  Stop Codons are not present, therefore protein will not be
                  formed.
                </p>
              ) : (
                <p>
                  The Length of the DNA String does not form valid codons (Must
                  be divisible by 3). Therefore no protein is formed.
                </p>
              )}
            </div>
          ) : (
            <div>
              <h1>Amino Acid Sequence</h1>
              <p>{aaString}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DNAToAA;
