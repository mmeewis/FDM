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

## Define a datasource in AEM

* Navigate to (http://localhost:4502/libs/fd/fdm/gui/components/admin/fdmcloudservice/fdm.html/conf)
* Open "Global" and hit "Create"
* Enter name and title and select "RESTful" service as the Service Type
* Next
* Select "File" as the Swagger source
* Browse and uplaod "acs-swagger-datamodel-v3.json"
* Create

## Create the Forms Data Model in AEM

* Navigate to (http://localhost:4502/aem/forms.html/content/dam/formsanddocuments-fdm)
* Create
* Enter a name and select "Global" as your "Data Source Configuration"
* Next
* Select your data source created in the previous step
* Save and open in "Edit"

![fdm.png](assets/fdm.png)

## Define the read/write methods

* Select "Profile" under "DEFAULT SCHEMA" and "Add Selected"
* In the dialog, click "Add"
* Save

![fdm2.png](assets/fdm2.png)
  
* In the "Model" window select "Profile" (it should turn blue when properly selected)
* In the top menu, select "Edit Properties"
* In the "Edit Properties" panel select
   * "GET /customer/getACSProfileByCustomerId/{id}" as your read service
   * "POST /customer/createACSProfile" as your write service
