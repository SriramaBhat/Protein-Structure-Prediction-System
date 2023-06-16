import h5py
import os
import numpy as np


def concatenate(list1, list2):
    for x in list2:
        list1.append(x)
    return list1


base_path = "F:\\Protein-Structure-Prediction-System\\backend\\protein_structure_prediction\\data\\preprocessed\\"
entries = os.listdir(base_path)
data_mask = []
data_primary = []
data_tertiary = []
for entry in entries:
    entry_path = os.path.join(base_path, entry)
    if os.path.isfile(entry_path) and os.path.splitext(entry)[1] == ".hdf5" and \
            os.path.splitext(entry)[0].find("training") != -1 and \
            os.path.splitext(entry)[0].find("training_30") == -1 and \
            os.path.splitext(entry)[0].find("training_50") == -1:
        keys = ["mask", "primary", "tertiary"]
        with h5py.File(entry_path, "r") as f:
            temp_data_mask = list(f[keys[0]])
            temp_data_primary = list(f[keys[1]])
            temp_data_tertiary = list(f[keys[2]])
            concatenate(data_mask, temp_data_mask)
            concatenate(data_primary, temp_data_primary)
            concatenate(data_tertiary, temp_data_tertiary)
data_mask = np.array(data_mask)
data_primary = np.array(data_primary)
data_tertiary = np.array(data_tertiary)
print(data_mask.shape)
print(data_primary.shape)
print(data_tertiary.shape)

with h5py.File(os.path.join(base_path, "training_set.hdf5"), "w") as f:
    dset1 = f.create_dataset('primary', data=data_primary, dtype='int32')
    dset2 = f.create_dataset('tertiary', data=data_tertiary, dtype='float')
    dset3 = f.create_dataset('mask', data=data_mask, dtype='uint8')
