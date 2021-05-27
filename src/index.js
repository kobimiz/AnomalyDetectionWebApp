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
    console.log('uploaded training file successfuly')
})

app.post('/uploadDetect', upload.single('data'), (req, res) => {
    console.log('uploaded detection file successfuly')
})

app.post('/detect', (req, res) => {
    let socket = new net.Socket()
    socket.connect(8000, "localhost", function () {
        console.log("Client: Connected to server")
    })

    let result = ''
    socket.on("data", function (data) {
        result += data.toString()
    })
    socket.on('end', () => {
        res.send(result)
    })

    let trainFile = fs.readFileSync('./uploads/train.csv').toString()
    let detectFile = fs.readFileSync('./uploads/detect.csv').toString()
    socket.write('1\n')
    trainFile.split('\n').forEach(line => {
        socket.write(line + '\n')
    })
    socket.write('done\n')
    detectFile.split('\n').forEach(line => {
        socket.write(line + '\n')
    })
    socket.write('done\n')

    if (req.body.alg == 'Regression algorithm')
        socket.write('7\n')
    else
        socket.write('3\n')

    socket.write('5\n60,70\n70,74\ndone\n4\n6\n')
})

//POST Requests

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})