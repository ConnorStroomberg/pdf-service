const express = require('express')
const bodyParser = require('body-parser')
const PDFDocument = require('pdfkit')
const pdfMakePrinter = require('pdfmake/src/printer')

const app = express()

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())

const port = 3000

generatePdf = (docDefinition, callback) => {
    try {
        const fontDescriptors = {
            Roboto: {
                normal: 'Roboto/Roboto-Regular.ttf',
                bold: 'Roboto/Roboto-Medium.ttf',
                italics: 'Roboto/Roboto-Italic.ttf',
                bolditalics: 'Roboto/Roboto-MediumItalic.ttf'
            }
        }
        const printer = new pdfMakePrinter(fontDescriptors)
        const doc = printer.createPdfKitDocument(docDefinition)

        let chunks = []

        doc.on('data', (chunk) => {
            chunks.push(chunk)
        })

        doc.on('end', () => {
            callback(Buffer.concat(chunks))
        })

        doc.end()

    } catch (err) {
        console.log('error in gen pdf')
        throw (err)
    }
};


app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})

app.get('/pdfkit', (req, res) => {
    const doc = new PDFDocument
    doc.pipe(res);
    doc.text('Hello world!', 100, 100)
    doc.end();
})

app.post('/makepdf', (req, res) => {
    console.log('handle post')
    const docDefinition = {
        content: [
            'This will show up in the file created',
             req.body['hello']
        ]
    }
    generatePdf(docDefinition, (pdf) => {
        res.set('Content-Type', 'application/pdf')
        res.send(pdf) // Buffer data
    })
})

app.listen(port, () => console.log(`PDF gererator listening on port ${port}!`))