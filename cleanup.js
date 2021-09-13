MongoClient.connect(url, function(err, client){   
    const db = client.db('File-Sharing');
    const collection = db.collection('fs.files');    
    const collectionChunks = db.collection('fs.chunks');
    collection.find({filename: fileName}).toArray(function(err, docs){        

    collectionChunks.find({files_id : docs[0]._id})
    .sort({n: 1}).toArray(function(err, chunks){          

    let fileData = [];          
    for(let i=0; i<chunks.length;i++){            

    fileData.push(chunks[i].data.toString('base64'));          
    }

    let finalFile = 'data:' + docs[0].contentType + ';base64,' 
        + fileData.join('');          
    res.render('imageView', {
        title: 'Image File', 
        message: 'Image loaded from MongoDB GridFS', 
        imgurl: finalFile});
    });               
    });  
});
