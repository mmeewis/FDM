# FDM
Forms Data Model - JSON Schema

## Setup

* Install Node.js

* Install the following packages (npm install)
  * express
  * request
  * body-parser
  * fs
  * axios
  * jsonwebtoken

* Copy your private key into the folder where you will run acs-profile.js

* Edit acs-profile.js
  
  * From the adobe.io console copy the JWT for your integration and paste it to the jwtPayload object
  
```javascript
// get your jwtPayload from the adobe.io console

var jwtPayload = {
    "exp": 1537388667,
    "iss": "xxxxxxx@AdobeOrg",
    "sub": "xxxxxxx@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_campaign_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/xxxxxxxxxxxxxxxxxx"
};
```
  * Replace the "exp" by "exp": tomorrow.getTime() so that it looks like:

```javascript
// get your jwtPayload from the adobe.io console

var jwtPayload = {
    "exp": tomorrow.getTime(),
    "iss": "xxxxxxx@AdobeOrg",
    "sub": "xxxxxxx@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_campaign_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/xxxxxxxxxxxxxxxxxx"
};
```
  
  * Copy your clientId and clientSecret from the adobe.io console and paste it into the code
  
```javascript
// get your clientId and clientSecret from the adobe.io console
var clientId = 'xxxxxxxxxxxxxxxxxxx';
var clientSecret = 'xxxxxxxxxxxxxxxxxx';
```

## Run

* node acs-profile.js

## Define a cloudservice in AEM

* Navigate to [http://localhost:4502/libs/fd/fdm/gui/components/admin/fdmcloudservice/fdm.html/conf]
  
