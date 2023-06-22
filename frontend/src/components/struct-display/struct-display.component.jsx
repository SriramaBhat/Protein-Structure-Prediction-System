import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import jQuery from "jquery";
import * as $3Dmol from "3dmol/build/3Dmol.js";
import $ from "jquery";

const MolViewer = () => {
  const { state } = useLocation();
  let pdbPath = "22_06_2023_20_34_26_pred.pdb";
  if (state !== null) {
    const { data } = state;
    pdbPath = data.pdbPath;
  }
  const dataPath = "http://localhost:5000/getdata/" + pdbPath;
  pdbPath = "http://localhost:5000/" + pdbPath;
  useEffect(() => {
    const initViewer = () => {
      let element = $("#container-01");
      let config = { backgroundColor: "lightgrey" };
      let viewer = $3Dmol.createViewer(element, config);
      jQuery.ajax(dataPath, {
        success: function (data) {
          let v = viewer;
          v.addModel(data, "pdb");
          v.setStyle(
            {},
            { cartoon: { color: "spectrum" } }
          );
          v.zoomTo();
          v.render();
          v.zoom(1.2, 1000);
        },
        error: function (hdr, status, err) {
          console.error("Failed to load PDB " + dataPath + ": " + err);
        },
      });
    };

    if (typeof window !== "undefined") {
      initViewer();
    }
  }, [dataPath]);

  return (
    <div className="struct-cont" style={{ textAlign: "center" }}>
      <div
        id="container-01"
        className="mol-container"
        style={{ width: "60%", height: 450, position: "relative", margin: "30px auto" }}
      ></div>
      <Link className="signin-btn" to={pdbPath}>
        Download PDB
      </Link>
    </div>
  );
};

export default MolViewer;
