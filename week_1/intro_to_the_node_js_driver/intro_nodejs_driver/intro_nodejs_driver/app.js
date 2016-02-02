var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/video';

// MongoClient.connect(database URL, call back function).
MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to server");

    // Find some documents in our collection
    //
    // NOTE: find returns a cursor
    //       call toArray on the cursor and pass the result of
    //       toArray to the docs parameter of the callback.
    db.collection('movies').find({}).toArray(function(err, docs) {

        // Print the documents returned
        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        // Close the DB
        db.close();
    });

    // Declare success
    //
    // NOTE: due to async execution (occuring in separate threads),
    //       this log message will *probably* print out before any of the
    //       information in the callback function
    console.log("Called find()");
});


