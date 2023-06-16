import argparse
import importlib
import sys
import torch
from dashboard import start_dashboard_server

from util import write_out

def main():
    parser = argparse.ArgumentParser(
        description="Protein Structure Predictor",
        conflict_handler='resolve')
    parser.add_argument('--silent', dest='silent', action='store_true',
                        help='Dont print verbose debug statements.')
    parser.add_argument('--hide-ui', dest='hide_ui', action='store_true',
                        default=False, help='Hide loss graph and '
                                            'visualization UI while training goes on.')
    parser.add_argument('--evaluate-on-test', dest='evaluate_on_test', action='store_true',
                        default=False, help='Run model of test data.')
    parser.add_argument('--use-gpu', dest='use_gpu', action='store_true',
                        default=False, help='Use GPU.')
    parser.add_argument('--eval-interval', dest='eval_interval', type=int,
                        default=10, help='Evaluate model on validation set every n minibatches.')
    parser.add_argument('--min-updates', dest='minimum_updates', type=int,
                        default=2000, help='Minimum number of minibatch iterations.')
    parser.add_argument('--minibatch-size', dest='minibatch_size', type=int,
                        default=16, help='Size of each minibatch.')
    parser.add_argument('--experiment-id', dest='experiment_id', type=str,
                        default="example", help='Which experiment to run.')
    args, _ = parser.parse_known_args()

    if args.hide_ui:
        write_out("Live plot deactivated, see output folder for plot.")

    use_gpu = args.use_gpu

    if use_gpu and not torch.cuda.is_available():
        write_out("Error: --use-gpu was set, but no GPU is available.")
        sys.exit(1)

    if not args.hide_ui:
        # start web server
        start_dashboard_server()

    experiment = importlib.import_module("experiments." + args.experiment_id)
    experiment.run_experiment(parser, use_gpu)