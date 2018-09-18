var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var axios = require('axios');
var cors = require('cors')
var Bitly = require('bitly');
var fs      = require('fs');
var swaggerJSDoc = require('swagger-jsdoc');
var path = require('path');
var jwt = require('jsonwebtoken');


var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/static', express.static('public'));

// get your jwtPayload from the adobe.io console

var jwtPayload = {
    "exp": 1537388667,
    "iss": "xxxxxxx@AdobeOrg",
    "sub": "xxxxxxx@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_campaign_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/xxxxxxxxxxxxxxxxxx"
};


// get your clientId and clientSecret from the adobe.io console
var clientId = 'xxxxxxxxxxxxxxxxxxx';
var clientSecret = 'xxxxxxxxxxxxxxxxxx';

// put your private and public key in the folder where this script is located

var privateCert = fs.readFileSync('marcmeewis-230217-private.key');
var publicCert = fs.readFileSync('marcmeewis-230217-certificate_pub.crt');
var jwtToken = jwt.sign(jwtPayload, privateCert, { algorithm: 'RS256'});
var accessToken = '';

console.log("jwtToken : " + jwtToken);


// Refresh bearer token every hour

refreshBearer();
setInterval(refreshBearer, 24 * 60 * 60); // every 254 hours


function refreshBearer() {
    
    console.log("Refreshing Bearer...");
    // jwtToken = jwt.sign(jwtPayload, privateCert, { algorithm: 'RS256'});
        
    // console.log("Error : " + err)
        
    axios({
        method:'post',
        headers: {
            'cache-control' : 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        responseType: 'application/json',
        url:'https://ims-na1.adobelogin.com/ims/exchange/jwt?client_id=' + clientId + '&client_secret=' + clientSecret + '&jwt_token=' + jwtToken
    })
    .then(function (response) {

        console.log('Adobe login response : ' + JSON.stringify(response.data));
        
        accessToken = response.data.access_token;

    })
    .catch(function (error) {
        console.log(error);
    });
    
}

app.get('/forms/customer/getACSProfileByCustomerId/:id', function(req, res) { 
    
  
  var customerId = req.params.id;
    
  console.log("Getting ACS profile for customerId : " + customerId);
      
  axios({
        method:'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control' : 'no-cache',
            'x-api-key' : clientId,
            'content-type': 'application/json'
        },
        json: true,
        url:'https://mc.adobe.io/marcmeewis-230217.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/byCrmid?crmid_parameter=' + customerId,
        
    })
    .then(function (response) {
      
        var profile = response.data.content[0];
        var customer = {};
        customer.cusCrmid = profile.cusCrmid;
        customer.firstName = profile.firstName;
        customer.lastName = profile.lastName;
        customer.gender = profile.gender;
        customer.email = profile.email;
        customer.birthDate = profile.birthDate;
        customer.mobilePhone = profile.mobilePhone;
        customer.location = {};
        customer.location.city = profile.location.city;
        customer.location.zipCode = profile.location.zipCode;
      
        console.log("ACS response : " + JSON.stringify(customer));
        
        res.send(JSON.stringify(customer));
    })
    .catch(function (error) {
        console.log("/forms/customer/getACSProfileByCustomerId Error");
        console.log(error);
    });
})


app.get('/forms/customer/getACSProfiles', function(req, res) { 
    
  console.log("Getting ACS profiles");
      
  axios({
        method:'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control' : 'no-cache',
            'x-api-key' : clientId,
            'content-type': 'application/json'
        },
        json: true,
        url:'https://mc.adobe.io/marcmeewis-230217.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile',     
    })
    .then(function (response) {        
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log("/forms/customer/getACSProfiles");
        console.log(error);
    });
})

app.post('/forms/customer/createACSProfile', function(req, res) { 
    
  var customerId = Math.floor(Math.random() * 100000);
  
  var customer = req.body;    
    
  customer.cusCrmid = customerId;
  
  console.log('About to post : ' + JSON.stringify(customer));
    
  axios({
        method:'post',
        url:'https://mc.adobe.io/marcmeewis-230217.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile',
        data: req.body,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control' : 'no-cache',
            'x-api-key' : clientId,
            'content-type': 'application/json'
        },
        json: true
    })
    .then(function (response) {
        
        console.log(JSON.stringify(response.data));
        res.send(JSON.stringify(customer));
    })
    .catch(function (error) {
        console.log(error);
    });    
  
})


// Service methods

app.get('/forms/postalcode/:postalcode' , function(req, res) {
    
    var postalcode = req.params.postalcode;
    
    console.log('Getting info for postcode : ' + postalcode);
    
    axios({
        method:'get',
        json: true,
        url:'https://opzoeken-postcode.be/' + postalcode + '.json'
        
    })
    .then(function (response) {
      
        var city = response.data[0];
        
        console.log("Postcode API response : " + JSON.stringify(city.Postcode));
        
        res.send(JSON.stringify(city.Postcode));
        
        console.log('Done.')
    })
    .catch(function (error) {
        console.log("/forms/postcode/ Error");
        console.log(error);
    });           
    
});


app.listen(8085);
