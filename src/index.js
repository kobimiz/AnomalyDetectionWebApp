//Importing node packages
const express = require('express')
const multer = require('multer')
const net = require('net')
const fs = require('fs')

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

// first two params are just strings containing the data
// third takes the values: 'Regression algorithm' or 'Hybrid algorithm'
// forth is the object used to send back to client
// fifth is the function used to transform the data sent to the client
async function trainDetect(trainFile, detectFile, type, res, transformFunc) {
    if (type != 'Regression algorithm' && type != 'Hybrid algorithm')
        return
    let socket = new net.Socket()
    socket.connect(8000, "localhost", () => {})

    let result = ''
    socket.on("data", function (data) {
        result += data.toString()
    })
    socket.on('end', () => {
        res.send(transformFunc(result))
    })
    socket.write('1\n')
    trainFile.split('\n').forEach(line => {
        socket.write(line + '\n')
    })
    socket.write('done\n')
    detectFile.split('\n').forEach(line => {
        socket.write(line + '\n')
    })
    socket.write('done\n')

    if (type == 'Regression algorithm')
        socket.write('7\n')
    else (type == 'Regression algorithm')
        socket.write('3\n')

    socket.write('4\n6\n')
}

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
    let body = JSON.parse(req.body)
    trainDetect(fs.readFileSync('./uploads/train.csv').toString(), fs.readFileSync('./uploads/detect.csv').toString(), body.alg, res, res => res)
})


app.post('/', (req, res) => {
    /**
     * request body format:
     * {
     *  alg: regression/hybrid,
     *  trainData: ...,
     *  detectData: ...
     * }
     */
    if (req.body.alg == undefined || req.body.trainData == undefined || req.body.detectData == undefined) {
        res.json({error: "Not a valid request format"})
    } else {
        trainDetect(req.body.trainData, req.body.detectData, req.body.alg, res, result => {
            let arr = result.replace(/[ \t]+/g, ' ').split('\n')
            arr.pop()
            return JSON.stringify(arr.map(row => {
                let splitted = row.split(' ')
                let obj = {}
                obj[splitted[0]] = splitted[1]
                return obj
            }))
        })
    }



})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})