import time
import numpy as np
import requests
import torch.optim as optim
from Util_Functions import set_experiment_id, write_out, write_model_to_disk, write_result_summary


def train_model(data_set_identifier, model, train_loader, validation_loader,
                learning_rate, minibatch_size=64, eval_interval=50, hide_ui=False,
                use_gpu=False, minimum_updates=1000):
    set_experiment_id(data_set_identifier, learning_rate, minibatch_size)

    validation_dataset_size = validation_loader.dataset.__len__()

    if use_gpu:
        model = model.cuda()

    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    sample_num = list()
    train_loss_values = list()
    validation_loss_values = list()

    best_model_loss = 1e20
    best_model_minibatch_time = None
    best_model_path = None
    _best_json_data = None
    stopping_condition_met = False
    minibatches_proccesed = 0

    while not stopping_condition_met:
        optimizer.zero_grad()
        model.zero_grad()
        loss_tracker = np.zeros(0)
        for _minibatch_id, training_minibatch in enumerate(train_loader, 0):
            minibatches_proccesed += 1
            start_compute_loss = time.time()
            loss = model.compute_loss(training_minibatch)
            write_out("Train loss:", float(loss))
            start_compute_grad = time.time()
            loss.backward()
            loss_tracker = np.append(loss_tracker, float(loss))
            end = time.time()
            write_out("Loss time:", start_compute_grad - start_compute_loss, "Grad time:",
                      end - start_compute_grad)
            optimizer.step()
            optimizer.zero_grad()
            model.zero_grad()

            # for every eval_interval samples, plot performance on the validation set
            if minibatches_proccesed % eval_interval == 0:

                write_out("Testing model on validation set...")

                train_loss = float(loss_tracker.mean())
                loss_tracker = np.zeros(0)
                validation_loss, json_data, _ = model.evaluate_model(validation_loader)

                if validation_loss < best_model_loss:
                    best_model_loss = validation_loss
                    best_model_minibatch_time = minibatches_proccesed
                    best_model_path = write_model_to_disk(model)
                    _best_json_data = json_data

                write_out("Validation loss:", validation_loss, "Train loss:", train_loss)
                write_out("Best model so far (validation loss): ", best_model_loss, "at time",
                          best_model_minibatch_time)
                write_out("Best model stored at " + best_model_path)
                write_out("Minibatches processed:", minibatches_proccesed)
                sample_num.append(minibatches_proccesed)
                train_loss_values.append(train_loss)
                validation_loss_values.append(validation_loss)

                json_data["validation_dataset_size"] = validation_dataset_size
                json_data["sample_num"] = sample_num
                json_data["train_loss_values"] = train_loss_values
                json_data["validation_loss_values"] = validation_loss_values

                if not hide_ui:
                    write_out("Updating monitoring service:", str(json_data)
                              if len(str(json_data)) < 50 else str(json_data)[:50]+"...")
                    res = requests.post('http://localhost:5000/graph', json=json_data)
                    if res.ok:
                        write_out("Received response from monitoring service:", res.json())

                if minibatches_proccesed > minimum_updates and minibatches_proccesed \
                        >= best_model_minibatch_time + minimum_updates:
                    stopping_condition_met = True
                    break
    write_result_summary(best_model_loss)
    # write_result_summary(json.dumps(_best_json_data))
    return best_model_path
