import {readCSV, MinMaxScaler} from "danfojs";
import preparedDataUrl from "url:../data/sleepEfficiencyPrepared.csv";
import * as tf from "@tensorflow/tfjs";

readCSV(preparedDataUrl).then((df) => {
    //Step 1 - Drop the ID column since it has no use for training
    df = df.drop({
        columns: [
            "ID"
        ]
    });

    //Step 2 - Extract the training data: the input features and the target number we want to predict
    let XTrain = df.drop({
        columns: [
            "Effective sleep"
        ]
    });

    console.log(`Training dataframe shape: ${XTrain.shape}`);

    let yTrain = df["Effective sleep"];

    //Step 3 - Scale the training data to disallow larger numbers having a larger influence
    let scaler = new MinMaxScaler();
    scaler.fit(XTrain);
    XTrain = scaler.transform(XTrain);

    XTrain.plot("tableDiv").table({});


    //Step 4 - Create the model
    const model = getModel();

    //Step 5 - Compile the model for regression
    model.compile({
        optimizer: "adam",
        loss: "meanSquaredError"
    });

    //Step 6 - Train the model
    model.fit(XTrain.tensor, yTrain.tensor, {
        batchSize: 16,
        epochs: 15,
        validationSplit: 0.15,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                console.log(logs);
            }
        }
    }).then(() => {
        console.log("Training complete!");
        model.save("localstorage://sleepEfficiencyModel");
        // model.save('downloads://sleepEfficiencyModel');
    })
});

function getModel() {
    const model = tf.sequential();

    model.add(tf.layers.dense({inputShape: [7], units: 124, activation: "relu", kernelInitializer: "leCunNormal"}));
    model.add(tf.layers.dense({units: 64, activation: "relu"}));
    model.add(tf.layers.dense({units: 32, activation: "relu"}));
    model.add(tf.layers.dense({units: 1, activation: "relu"}))
    model.summary();

    return model;
}