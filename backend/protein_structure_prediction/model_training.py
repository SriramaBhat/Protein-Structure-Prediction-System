from Data_Preprocessing import process_raw_data

from Model import *
from training import train_model
from Util_Functions import contruct_dataloader_from_disk


def run_experiment(parser, use_gpu):
    # parse experiment specific command line arguments
    parser.add_argument('--learning-rate', dest='learning_rate', type=float,
                        default=0.01, help='Learning rate to use during training.')
    parser.add_argument('--min-updates', dest='minimum_updates', type=int,
                        default=1000, help='Minimum number of minibatch iterations.')
    parser.add_argument('--minibatch-size', dest='minibatch_size', type=int,
                        default=1, help='Size of each minibatch.')
    args, _unknown = parser.parse_known_args()

    # pre-process data
    # process_raw_data(use_gpu, force_pre_processing_overwrite=False)

    # run experiment
    training_file = "data/preprocessed/single_protein.txt.hdf5"
    validation_file = "data/preprocessed/single_protein.txt.hdf5"

    model = Model(21, args.minibatch_size, use_gpu=use_gpu)  # embed size = 21

    train_loader = contruct_dataloader_from_disk(training_file, args.minibatch_size)
    validation_loader = contruct_dataloader_from_disk(validation_file, args.minibatch_size)

    train_model_path = train_model(data_set_identifier="TRAIN",
                                   model=model,
                                   train_loader=train_loader,
                                   validation_loader=validation_loader,
                                   learning_rate=args.learning_rate,
                                   minibatch_size=args.minibatch_size,
                                   eval_interval=args.eval_interval,
                                   hide_ui=args.hide_ui,
                                   use_gpu=use_gpu,
                                   minimum_updates=args.minimum_updates)

    print("Completed training, trained model stored at:")
    print(train_model_path)
