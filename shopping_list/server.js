var express = require('express');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var app = express();

// var mongoose = require('mongoose')
// mongoose.connect('mongodb://user:password@localhost/shoppingApp');
// var query = ShoppingList.findOne({ name: 'chocolate' })

var Storage = function () {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function (name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

//delete by id
Storage.prototype.delete = function (id) {
    //for or foreach loop
    for (var i = 0; i < storage.items.length; i++ ) {
        if (this.items[i].id === id) {
            this.items.splice(i, 1);
            return true;
        }
    }
    
    return false;
};


//update by id
Storage.prototype.update = function (id) {
    //for or foreach loop
    for (var i = 0; i < storage.items.length; i++ ) {
        if (this.items[i].id === id) {
            this.items.name = 'cookie';
            return true;
        }
    }
    
    return false;
};

//end update by id
var storage = new Storage(); 
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

app.use(express.static('public'));

app.get('/items', function (req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

//add delete
app.delete('/items/:id',  jsonParser, function(req, res) {
    var id = +req.params.id;

    if (storage.delete(id)) {
        return res.status(200).end();
    }
    
    res.status(404).end();
});


//add update
//app.update('/items/:id',  jsonParser, function(req, res) {
//    var id = +req.params.id;

//    if (storage.update(id)) {
//        return res.status(200).end();
//    }
    
//    res.status(404).end();
//});

//end add update


app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;