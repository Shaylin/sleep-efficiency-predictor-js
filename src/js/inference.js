import {readCSV, MinMaxScaler, Series} from "danfojs";
import preparedDataUrl from "url:../data/sleepEfficiencyPrepared.csv";
import * as tf from "@tensorflow/tfjs";

readCSV(preparedDataUrl).then(async (df) => {
    //Step 1 - Re-create our scaler to be able to scale any inputs
    let XTrain = df.drop({
        columns: [
            "ID",
            "Effective sleep"
        ]
    });

    console.log(XTrain.columns);

    let scaler = new MinMaxScaler();
    scaler.fit(XTrain);

    //Step 2 - Load model
    const model = await tf.loadLayersModel("localstorage://sleepEfficiencyModel");

    //Step 3 - Gather html form inputs and perform prediction on button press
    document.getElementById("predictionButton").addEventListener("click", () => {
        const inputTensor = tf.tensor([
            parseInt(document.getElementById("ageInput").value),
            parseInt(document.getElementById("genderInput").value),
            parseInt(document.getElementById("caffeineInput").value),
            parseInt(document.getElementById("alcoholInput").value),
            parseInt(document.getElementById("smokingInput").value),
            parseInt(document.getElementById("exerciseInput").value),
            parseInt(document.getElementById("sleepHourInput").value)
        ]).reshape([-1, 7]);

        const prediction = model.predict(scaler.transform(inputTensor));
        document.getElementById("effectiveSleepValue").innerHTML = prediction.dataSync()[0]
    });
});