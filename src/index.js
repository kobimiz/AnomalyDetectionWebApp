//Importing node packages
const express = require('express')
const multer = require('multer')
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
    let ts = new timeseries('./uploads/train.csv')
    let detObj;
    if (req.body.alg === 'Regression algorithm')
        detObj = new SimpleAnomalyDetector()
    else if (req.body.alg === 'Hybrid algorithm')
        detObj = new HybridAnomalyDetector();
    detObj.learnNormal(ts)

    res.send(req.file)
})
app.post('/detect', upload.single('data'), (req, res) => {
    let ts = new timeseries('./uploads/detect.csv')
    let detObj;
    if (req.body.alg === 'Regression algorithm')
        detObj = new SimpleAnomalyDetector()
    else if (req.body.alg === 'Hybrid algorithm')
        detObj = new HybridAnomalyDetector()
    const anomalies = detObj.detect(ts)

    res.send(anomalies)
})

//POST Requests

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})