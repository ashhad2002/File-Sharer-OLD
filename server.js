const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongodb = require('mongodb');
const { MongoClient } = require("mongodb");
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const client = new MongoClient(process.env.FILE_DB_URI);

const app = express();
app.use(
    cors({
        origin: "*"
    })
);

app.use(fileUpload());
app.use(express.json());

async function upload_file(filename) {
    mongodb.MongoClient.connect(process.env.FILE_DB_URI, function(error, client) {
        const database = client.db('File-Sharing');
        var bucket = new mongodb.GridFSBucket(database);
        fs.createReadStream(`./toup/${filename}`).
        pipe(bucket.openUploadStream(`${filename}`)); 
}); 
}


var x = [];
async function get_info() {
    await client.connect();
    const database = client.db("File-Sharing");
    const info = database.collection("fs.files");

    const query = {};
    const options = {
        projection: { _id: 1, filename: 1, uploadDate: 1 },
    };
    const cursor = await info.find(query, options).toArray();
    cursor.forEach((doc)=> {
        x.push(doc);
    });
    await client.close();
}

app.post('/upload', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/toup/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/toup/${file.name}` });
    });
    upload_file(file.name);
});

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    mongodb.MongoClient.connect(process.env.FILE_DB_URI, function(err, client) {
        if (err) throw err;
        var dbo = client.db("File-Sharing");
        dbo.collection("fs.files").find({}, { projection: { _id: 1, filename: 1, uploadDate: 1 } }).toArray(function(err, result) {
          if (err) throw err;
          client.close();
          res.send(JSON.stringify(result));
        });
      });
});

var fname = '';
app.post('/send_id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    fname = req.body.filename;
    res.send(fname);
});

app.get('/download', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    client.connect(function() {
      
        const db = client.db('File-Sharing');
      
        var bucket = new mongodb.GridFSBucket(db);
      
        bucket.openDownloadStreamByName(fname).
        pipe(fs.createWriteStream(`./todl/${fname}`)).
        on('error', function(error) {
            assert.ifError(error);
        }).
        on('end', function() {
            console.log('done!');
        });
      });
      setTimeout(function(){ 
        res.download(`./todl/${fname}`);
      }, 1200);
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});

