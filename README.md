# Sleep Efficiency Predictor

This project exists to serve as an example on training a neural network in nothing but javascript within your browser.

Utilizing javascript in the browser has the following benefits:
- Simple dependency management with npm
- Powerful html & css data visualisations
- GPU accelerated training through WebGL compute shaders without any extra sdk or driver installation 
- The trained model is ready to deploy any other browser client

The main drawback of this set up is that performance of model training and inference will be slower than 
running code natively on a computer with something like Node.js or Python.
That being said, spending days configuring your Python environment and fiddling with CUDA drivers is also slow 😶‍🌫️.

## Objective

This work utilizes the [sleep efficiency dataset](https://www.kaggle.com/datasets/equilibriumm/sleep-efficiency) from kaggle.

While the dataset is quite limited in size and has many methodological issues, it is a good candidate to help us answer the question:
> What is the ideal bedtime to achieve the highest sleep efficiency?

We will first utilize [danfo.js](https://danfo.jsdata.org/) to ingest and prepare, and visualize our downloaded data csv.

[Tensorflow.js](https://www.tensorflow.org/js) will be used for the training and inference process.

## Getting Started
The only software you need is Node.js 18.

To install library dependencies run the following command at the root of the project:

`npm install`

To execute the project webpage, run the following command:

`npm run start`