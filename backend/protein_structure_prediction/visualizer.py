import sidechainnet as scn
import torch
from sidechainnet.structure.structure import inverse_trig_transform
import py3Dmol
import os
from datetime import datetime

from model import ProteinNet
from config import get_parameters


def aa_to_int_seq(aaString, device):
    AA_ID_DICT = {'A': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'K': 9,
                  'L': 10, 'M': 11, 'N': 12, 'P': 13, 'Q': 14, 'R': 15, 'S': 16, 'T': 17,
                  'V': 18, 'W': 19, 'Y': 20}
    aa_int_seq = list([AA_ID_DICT[aa] for aa in aaString])
    aa_int_seq = torch.tensor(aa_int_seq)
    aa_int_seq = aa_int_seq.to(device)
    aa_int_seq = aa_int_seq.unsqueeze(0)
    print(aa_int_seq.shape)
    return aa_int_seq


def build_structure(model, data, device):
    model_input = data.to(device)
    predicted_angles_sincos = model(model_input)
    predicted_angles = inverse_trig_transform(predicted_angles_sincos)
    sb_pred = scn.BatchedStructureBuilder(data, predicted_angles.cpu())
    return sb_pred


def plot_protein(exp):
    p = py3Dmol.view(js='https://3dmol.org/build/3Dmol.js', viewergrid=(0, 0))
    p.addModel(open(exp, 'r').read(), 'pdb', viewer=(0, 0))
    p.setStyle({'cartoon': {'color': 'spectrum'}})
    p.zoomTo()
    p.show()


def plotting(aaString, config, device):
    aa_int_seq = aa_to_int_seq(aaString, device)
    model = ProteinNet(d_hidden=config.d_hidden,
                       dim=config.dim,
                       d_in=config.d_in,
                       d_embedding=config.d_embedding,
                       heads=config.n_heads,
                       dim_head=config.head_dim,
                       integer_sequence=config.integer_sequence)
    model = model.to(device)
    model.load_state_dict(torch.load('{}/model_weights.pth'.format(config.model_save_path)))

    if not os.path.exists('./plots'):
        os.mkdir('./plots')
    sb_preds = build_structure(model, aa_int_seq, device)
    date_string = datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    print(date_string)
    sb_preds.to_pdb(0, path='./plots/{}_pred.pdb'.format(date_string))
    plot_protein("./plots/{}_pred.pdb".format(date_string))


if __name__ == "__main__":
    if torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")
    aaString = input("Enter the amino acid string: ")
    config = get_parameters()
    plotting(aaString, config, device)
