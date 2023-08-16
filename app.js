const express = require('express')

const fileUpload = require('express-fileupload')


const app = express()


app.use(fileUpload())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/upload',(req,res) => {

    let EDFile = req.files.file

    EDFile.mv(`./files/${EDFile.name}`,err => {

        if(err) return res.status(500).send({ message : err })


        return res.status(200).send({ message : 'Archivo subido' })

    })

})

app.listen(3000,() => console.log('Corriendo'))
app.get('/favicon.ico', (req, res) => res.status(204));