var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbmean');

//var Article = mong.model('article', {title: String,resum: String,name: String});
var Commentaire = mongoose.model('commentaire', {id_article: String, name: String, commentaire: String});

/* GET home page. */
var Article = mongoose.model('articles', {title: String,resum: String,name: String});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/articles/:id', function(req, res){
    Article.findById(req.params.id).exec(function(err, result){
        if (err){
            res.status(400).send({'status' : 400, 'message' : err});
        }else {
            console.log(result);
            res.status(200).send(result);
        }
    });
});
router.get('/commentaire/:id/find', function(req, res){

    Commentaire.findById(req.params.id).exec(function(err, result){
        if (err){
            console.log(err)
            res.status(400).send({'status' : 400, 'message' : err});
        }else {
            console.log(result);
            res.status(200).send(result);
        }
    });
});

router.put('/commentaire/:id/edit', function(req, res) {
    Commentaire.findByIdAndUpdate(req.params.id, req.body).exec(function(err, result){
        if (err){
            res.status(400).send({'status' : 400, 'message' : err});
        }else {
            console.log(result);
            res.status(200).send(result);
        }
    });
});
router.put('/articles/:id', function(req, res){
    console.log(req.body);
    Article.findByIdAndUpdate(req.params.id, req.body).exec(function(err, result){
        if (err){
            res.status(400).send({'status' : 400, 'message' : err});
        }else {
            console.log(result);
            res.status(200).send(result);
        }
    });
});

router.post('/article', function(req, res){
    console.log("blala");
    if (req.body.name && req.body.title && req.body.resum) {
        var art = new Article({title: req.body.title, resum: req.body.resum, name: req.body.name});
        art.save(function (err) {
            if (err) {
                res.status(500).send('error');
            } else {
                res.status(200).send('ok');
            }
        });
    }else{
        res.status(500).send('error');
    }
});

router.get('/articles', function(req, res){
  Article.find().exec(function(err, result){
    if (err){
      res.status(400).send({'status' : 400, 'message' : err});
    }else {
        console.log(result);
        res.send(result);
    }
  });
});
router.post('/commentaires/:id/',function(req, res){
    if (req.body.name && req.body.text) {
        var com = new Commentaire({id_article: req.params.id, name: req.body.name, commentaire: req.body.text});
        com.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('error');
            } else {
                res.status(200).send('ok');
            }
        });
    }else {
        res.status(500).send('error');
    }
});

router.get('/commentaires/:id', function(req, res){
  Commentaire.find({id_article: req.params.id}).exec(function(err, result){
    if (err){
      res.status(400).send({'status' : 400, 'message' : err});
    }else {
      res.status(200).send(result);
    }
  });
});
module.exports = router;
