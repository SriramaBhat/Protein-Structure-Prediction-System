import sidechainnet as scn
import torch
from sidechainnet.structure.structure import inverse_trig_transform
import py3Dmol
import os
from datetime import datetime
import sys

from model import ProteinNet
# from config import get_parameters


def aa_to_int_seq(aaString, device):
    AA_ID_DICT = {'A': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'K': 9,
                  'L': 10, 'M': 11, 'N': 12, 'P': 13, 'Q': 14, 'R': 15, 'S': 16, 'T': 17,
                  'V': 18, 'W': 19, 'Y': 20}
    aa_int_seq = list([AA_ID_DICT[aa] for aa in aaString])
    aa_int_seq = torch.tensor(aa_int_seq)
    aa_int_seq = aa_int_seq.to(device)
    aa_int_seq = aa_int_seq.unsqueeze(0)
    # print(aa_int_seq.shape)
    return aa_int_seq


def build_structure(model, data, device):
    model_input = data.to(device)
    predicted_angles_sincos = model(model_input)
    predicted_angles = inverse_trig_transform(predicted_angles_sincos)
    sb_pred = scn.BatchedStructureBuilder(data, predicted_angles.cpu())
    return sb_pred


def plot_protein(exp):
    p = py3Dmol.view(js='https://3dmol.org/build/3Dmol.js', viewergrid=(1, 1))
    p.addModel(open(exp, 'r').read(), 'pdb', viewer=(0, 0))
    p.setStyle({'cartoon': {'color': 'spectrum'}})
    p.zoomTo()
    p.show()


def plotting(aaString, device):
    aa_int_seq = aa_to_int_seq(aaString, device)
    model = ProteinNet(d_hidden=512,
                       dim=256,
                       d_in=49,
                       d_embedding=32,
                       heads=8,
                       dim_head=64,
                       integer_sequence=True)
    model = model.to(device)
    model.load_state_dict(torch.load(
        'F:\\Protein-Structure-Prediction-System\\backend\\protein_structure_prediction\\models\\model_weights.pth'))

    if not os.path.exists('./plots'):
        os.mkdir('./plots')
    sb_preds = build_structure(model, aa_int_seq, device)
    date_string = datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    sb_preds.to_pdb(0,
                    path="F:\\Protein-Structure-Prediction-System\\backend\\protein_structure_prediction\\plots\\{}_pred.pdb".format(date_string))
    print(date_string)
    plot_protein("F:\\Protein-Structure-Prediction-System\\backend\\protein_structure_prediction\\plots\\{}_pred.pdb"
                 .format(date_string))
    
def predict():
    if torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")
    aaString = sys.argv[1]
    # aaString = input("Enter the aa sequence: ")
    try:
        plotting(aaString, device)
    except ImportError:
        print("")


if __name__ == "__main__":
    predict()
