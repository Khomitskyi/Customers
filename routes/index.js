var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res) {
    fs.readFile('./data/1.json', function (err, data) {
        if (err) throw err;
       res.send(data);
    });
     
});

router.get('/all', function(req, res) {
    var records = [];
    var dir = './data/';
    var c = 0;
    fs.readdir(dir , function(err, files){
        files.forEach(function(file){
            c++;
            fs.readFile(dir+file,function(err, data){
                if (err) throw err;
                records.push(data.toString());
                if (0===--c) {
                   res.send(records);
                }
            });
        });
            
    });
     
});


router.post('/data', function (req, res) {
    res.send(req.body);
    
    fs.writeFile('./data/'+req.body.id+'.json', JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
} );

router.post('/rm', function (req, res) {
    res.send(req.body);
    console.log(req.body);
    fs.unlink('./data/'+req.body.id+'.json', function (err) {
        if (err) throw err;
        console.log('successfully deleted'+req.body.id+'.json');
    });
    
});


module.exports = router;
