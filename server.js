
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
//var methodOverride = require('method-override');

var databaseConfig= require('./config/database');
var router = require('./app/models/routes').default;

mongoose.connect(databaseConfig.url);

app.listen(process.env.PORT || 30001);
console.log("App listening on port " + process.env.PORT);

app.use(bodyParser.urlencoded({ extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); //Log requests to API using morgan
//app.use(methodOverride());
app.use(cors());

router(app);

/*WATSON DISCOVERY*/
app.use( function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post('/watsonHospitals', function (req, res) {
    
    var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

    var discovery = new DiscoveryV1({
        username: "e7b4f01c-b48e-4396-b81e-af13c3ce8934",
        password: "0CLXM1k1uTWo",
        url: "https://gateway.watsonplatform.net/discovery/api",
        version_date: '2017-09-01'

    });

    discovery.query({
        environment_id: "4c5591b0-8aff-4b82-852c-d77e287b5375",
        collection_id: "b93af730-e0d9-4df2-ad1a-1a85a21fb1d4",
        query: "three hospitals with " + req.body.diagnosis + " services"
    },
        function (err, response) {
            if (err) {
                //console.log(err);
                res.status(401).send(err);
            } else {
                // res.send({
                //     passed: true,
                //     message: 'Post successful!'
                // });
                
                var cats = response.results;
                var foobar =  "";
                var counter = 2;

                cats.forEach(function(cat){
                    console.log(cat.enriched_text.entities);
                    var myAnswers= cat.enriched_text.entities.slice(3,13)               
                    myAnswers.forEach(function(entity){
                        foobar += "\n"+JSON.stringify(entity.text).replace(/\"/g, "");    
                        
                        
                    }, 2)
                })
                console.log(foobar);
                res.json(foobar, null, 5);
            }
        }
    )
});
