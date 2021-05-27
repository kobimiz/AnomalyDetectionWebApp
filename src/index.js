//Importing node packages
const express = require('express')
const multer = require('multer')
const net = require('net')
const fs = require('fs')
const SimpleAnomalyDetector = require('./../anomaly-main/AnomalyDetector/SimpleAnomalyDetector')
const HybridAnomalyDetector = require('./../anomaly-main/AnomalyDetector/HybridAnomalyDetector')
const timeseries = require('./../anomaly-main/AnomalyDetector/timeseries')

const app = express()
const PORT = process.env.PORT || 8080


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        if (req.body.actionType === 'train')
            cb(null, 'train.csv')
        else if (req.body.actionType === 'detect')
            cb(null, 'detect.csv')
    }
})

const upload = multer({ storage })

//Setting EJS as main view engine
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())

//GET Requestss
app.get('/', (req, res) => {
    res.render('index')
})
app.post('/uploadTrain', upload.single('data'), (req, res) => {
    console.log('uploaded training file successfuly');
})

app.post('/uploadDetect', upload.single('data'), (req, res) => {
    console.log('uploaded detection file successfuly');
})

app.post('/detect', (req, res) => {
    // let ts = new timeseries('./uploads/train.csv')
    // let detObj;
    // if (req.body.alg === 'Regression algorithm')
    //     detObj = new SimpleAnomalyDetector()
    // else if (req.body.alg === 'Hybrid algorithm')
    //     detObj = new HybridAnomalyDetector();
    // detObj.learnNormal(ts)
    // res.send(req.file)

    var socket = new net.Socket();
    socket.connect(8000, "localhost", function () {
        console.log("Client: Connected to server");
    });
    
    // Let's handle the data we get from the server
    let result = '';
    socket.on("data", function (data) {
        result += data.toString();
        console.log(data.toString());
    });
    // socket.on('end', () => {
    //     console.log(result);
    //     res.send(result);
    // })
    let trainFile = fs.readFileSync('./uploads/train.csv').toString();
    let detectFile = fs.readFileSync('./uploads/detect.csv').toString();
    console.log('sending 1');
    socket.write('1\n');
    trainFile.split('\n').forEach(line => {
        socket.write(line)
        socket.write('\n')
    });
    socket.write('done\n');
    detectFile.split('\n').forEach(line => {
        socket.write(line)
        socket.write('\n')
    });
    socket.write('done\n');

    if (req.body.alg == 'Regression algorithm') {
        console.log('sending 7');
        socket.write('7\n');
    }
    else {
        console.log('sending 3');
        socket.write('3\n');
    }
    console.log('sending 5');
    socket.write('5\n');
    socket.write(`60,70\n`);
    socket.write(`70,74\n`);
    socket.write(`done\n`);
    socket.write('4\n');
    socket.write(`6\n`);

    res.send('3');

    // let ts = new timeseries('./uploads/detect.csv')
    // let detObj;
    // if (req.body.alg === 'Regression algorithm')
    //     detObj = new SimpleAnomalyDetector()
    // else if (req.body.alg === 'Hybrid algorithm')
    //     detObj = new HybridAnomalyDetector()
    // const anomalies = detObj.detect(ts)

})

//POST Requests

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})