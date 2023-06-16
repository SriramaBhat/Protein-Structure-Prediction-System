# import Data_Preprocessing
import os
import h5py
if __name__ == "__main__":
    # Data_Preprocessing.process_raw_data(use_gpu=False, raw_data_path="G:\Protein-Structure-Raw-Data\casp8_validation")
    # print("Completed Preprocessing")
    base_path = "F:\\Protein-Structure-Prediction-System\\backend\\protein_structure_prediction\\data\\preprocessed\\"
    entries = os.listdir(base_path)
    for entry in entries:
        entry_path = os.path.join(base_path, entry)
        if os.path.isfile(entry_path) and os.path.splitext(entry_path)[1] == ".hdf5":
            print("File Path: \t", entry_path)
            f = h5py.File(entry_path, "r")
            print(f.keys())
            for key in f.keys():
                print(f[key].shape)
            print("+"*60)
