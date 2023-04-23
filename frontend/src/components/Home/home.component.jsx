import React from "react";
import { Link } from "react-router-dom";
import "./home.styles.scss";

const Home = () => {
  return (
    <div className="home">
      <section className="main-section">
        <h1>Welcome to Protein Structure Predictor</h1>
        <p>In this website, the features provided are:</p>
        <ul>
          <li>DNA to Amino Acid Sequence Conversion</li>
          <li>Protein Structure Prediction using the Amino Acid Sequence</li>
        </ul>
        <p>To access these features, Sign In:</p>
        <Link className="signin-btn" to="/login">
          Sign In
        </Link>
      </section>
      <section className="DNA-converter">
        <h1>DNA to Amino Acid Converter</h1>
        <p>
          Amino Acids are the basic building blocks of proteins. Even though
          very large amount of proteins exists, in humans only 20 Amino Acids
          are essential.
        </p>
        <p>
          The DNA is converted into Amino Acid sequence in the cells, by the
          processes of transcription (to mRNA) and translation (from mRNA).
        </p>
        <p>
          The DNA to Amino Acid converter converts the input DNA sequence into
          an Amino Acid sequence through mapping of codons
        </p>
      </section>
      <section className="protein-structure">
        <h1>Protein Structure Prediction</h1>
        <p>
          The Amino Acid sequences, their distrotion angles and the groups
          attached, help in the formation of the secondary and tertiary
          structures of the protein.
        </p>
        <p>
          A protein's functionality is the result of it's secondary and tertiary
          chains. Predicting the structure of protein with accuracy, helps to
          find out the functionality of an unkonwn sequence and it's properties.
        </p>
        <p>
          This structure predictor, will provide the 3D representation of a
          protein based on it's Amino Acid Structure, using Machine Learning
          models (Structure may not be accurate for all cases).
        </p>
      </section>
    </div>
  );
};

export default Home;
