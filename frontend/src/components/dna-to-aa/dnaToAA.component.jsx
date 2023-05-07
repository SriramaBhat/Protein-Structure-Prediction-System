import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./dnaToAA.styles.scss";

const defaultFormFields = {
  dnaString: "",
};

const DNAToAA = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { dnaString } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dnaString = event.target.dnaString.value;
    console.log(dnaString);
    try {
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
          This part converts the given DNA string into a sequence of Amino Acids
        </p>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            label="DNA String"
            type="text"
            required
            name="dnaString"
            value={dnaString}
            onChange={handleChange}
          />
          <button type="submit" className="form-btn" onSubmit={handleSubmit}>
            Convert
          </button>
        </form>
      </div>
    </div>
  );
};

export default DNAToAA;
