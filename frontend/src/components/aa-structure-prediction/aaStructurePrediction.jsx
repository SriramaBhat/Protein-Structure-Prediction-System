import { useState } from "react";
import { fetchData } from "../../utils/fetchData/Fetch";
// import "./dnaToAA.styles.scss";

const defaultFormFields = {
  dnaString: "",
};

const AAStructPred = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // const [rnaString, setRnaString] = useState("");
  // const [aaString, setAaString] = useState("");
  const [conversionMessage, setConversionMessage] = useState("");
  const { aaString } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const aaString = event.target.aaString.value;
      const { data } = await fetchData(
        "http://localhost:5000/dna-to-aa",
        "POST",
        {
          aaString: aaString,
        }
      );
      setConversionMessage(data.message);
      console.log(conversionMessage);
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
    <div className="aa-converter-container">
      <div className="form-container">
        <h1>Amino Acid Structure Predictior</h1>
        <p>
          For the structure prediction of the protein, enter a valid amino acid
          sequence in a single alphabet representation.
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div className="textarea-div">
            <label htmlFor="aaString" className="form-input-label">
              Amino Acid String (Must be valid Single Letter code of Amino
              Acids)
            </label>
            <textarea
              type="text"
              required
              name="aaString"
              value={aaString}
              onChange={handleChange}
              cols="75"
              rows="10"
              id="aaString"
              className="text-inp"
            ></textarea>
          </div>
          <button type="submit" className="form-btn" onSubmit={handleSubmit}>
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default AAStructPred;
