# Anomaly Detection Web App
This utility provides web interface (as well as RESTfull API) for anomaly detection functionality.

## How it works
The web interface (served with node.js) opens a connection to a local c++ server that holds the detection functionality and communicates with it to retrieve the needed information to the user.

## Project structure
The c++ server is in the folder *<u>cppDetectionServer</u>*, and the rest of the files are the web server.  The server is the file *<u>src/index.js</u>* . The html files served (using ejs) are in the folder *<u>views</u>*, adhearing to the MVC architecture.

## Prerequisites
In order to run the project, you need to be on a linux machine, have node.js & npm installed. In addition, you need to have a c++ compiler and make.

## How to run
First, we need to download the project dependencies. This can be done by running `npm i` from the root project directory. Next, in order to run the web server, run `node src/index`.
Next, we need to build the c++ server. This is done by first navigating to the *<u>cppDetectionServer</u>* directory and running the command `make` (in a different terminal). Finaly, in order to run the cpp server, run `./server.out`.

## Web interface
After the web server is run, it can be accessed via a web browser in the url
> localhost:8080

You simple pick an algorithm, upload a training and a detection csv files and click start.

## RESTfull API
The main entry point is (using the post method)
> localhost:8080

You need to supply a JSON object in the following format
`{
       alg: Regression algorithm/Hybrid algorithm,
       trainData: ...,
       detectData: ...
  }`
  Where trainData and detectData are the actual data (and not file names)
  The returned value is a JSON obejct that contains the anomalies.
  
## Screen shot
![image](https://user-images.githubusercontent.com/56509308/120115595-0a29e780-c18d-11eb-8b0c-d37a9f46c394.png)

##Tutorial:
https://youtu.be/YHMhBSQIW2o
