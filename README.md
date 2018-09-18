# FDM
Forms Data Model - JSON Schema

## Requirement

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
