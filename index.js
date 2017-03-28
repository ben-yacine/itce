const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var https = require('https');
const exec = require('child_process').exec;
var fs = require('fs');
const request  = require('request');
var options = {
    pfx: fs.readFileSync('www.client-alexamb.uti.caisse-epargne.fr.pfx'),
    passphrase: 'P@ssw0rd!123'
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('This is an api');
});

app.post('/synthese', function (req, res) {

  var access_token = req.body.access_token;
	
  exec("curl -k 'https://www.alexamb.uti.caisse-epargne.fr/resource/synthese?access_token="+access_token+"'", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Error'});
    } else {
      var body = JSON.parse(stdout);
      res.status(200).send(body);
    }
  });
});

app.post('/infosclient', function (req, res) {

  var access_token = req.body.access_token;

  exec("curl -k 'https://www.alexamb.uti.caisse-epargne.fr/resource/infosclient?access_token="+access_token+"'", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Error'});
    } else {
      var body = JSON.parse(stdout);
      res.status(200).send(body);
    }
  });

});

app.post('/historique', function (req, res) {

  var access_token = req.body.access_token;
  var nc = req.body.nc;
  var nbop = req.body.nbop;

  exec("curl -k 'https://www.alexamb.uti.caisse-epargne.fr/resource/historique?"+nc+"?nbop="+nbop+"&nav=D&buffer=&access_token="+access_token+"'", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Error'});
    } else {
      var body = JSON.parse(stdout);
      res.status(200).send(body);
    }
  });
});

var server = https.createServer(options, app).listen(3000, function(){
    console.log('server running');
});

