//TO BEGIN RECORDING RUNNING TIME
app.intent('running_prompt', (conv) => {
    if (conv.data.area) {  //If blank to ensure location permission is allowed indirectly as a location is set already	  	
        const deviceCoordinatesStart = conv.device.location.coordinates;
        const latitudeValueStart = deviceCoordinatesStart.latitude;
        const longitudeValueStart = deviceCoordinatesStart.longitude;

        //SAVING LAT AND LONG
        conv.data.latitudeValueStart = latitudeValueStart
        conv.data.longitudeValueStart = longitudeValueStart

        let start = moment(); //Start time in UTC, you could also use dateTime()
        conv.data.starts = start; //Saving start time in context/session  // Saves in the T...Z format
        let startTz = momentTz(); //used because of getting the Timezone
        const timestamp = 1402629305; // Just a dud placeholder to fulfil timezone function

        //GEOLOCATION REVERSAL 
        geocoder.reverse({lat:latitudeValueStart, lon:longitudeValueStart}, (err, res) => {
                if (err) {
                console.log(err);
            }
            let startLocation = res[0].administrativeLevels.level1long; //To call address like, IKEJA
            conv.data.startLocation = startLocation; //Start location saved for session
        
                //GETTING LOCAL TIMEZONE FROM LAT/LONG AND TIMESTAMP, TO BE USED IN CONJUNCTION WITH BELOW
                //The reason for nesting this inside geocoder is to enable, the use/subsequent storage of it's local variable - startLocation
                /*A function defined inside another function (as is in this case here) can also access all variables defined in its parent function and any other variable to which the parent function has access.*/
                timezone.data(latitudeValueStart, longitudeValueStart, timestamp, (err, tz) => { 
                    if (err) {
                        console.log(err);
                        }
                    var zoneHolder = tz.raw_response.timeZoneId;  
                    const localTime = startTz.tz(zoneHolder).format('LLL'); //E.g start.tz('America/Los_Angeles').format('ha z');
                    conv.data.localTime = localTime; //Saved just for BigQuery sake
                        // app.ask('Your race starts by ' + localTime + 'at' + startLocation);
                    conv.ask('Your race starts now, ' + localTime);
                    conv.ask(new Suggestions('End Race'));
                });
        });
    } else {  //Returned if permission not granted
    conv.data.runningContext = 'yes'; //Just to set a placeholder to avoid the save location prompt(when you choose 'Locate me') on segueing from here RUNNING  
    conv.ask('You do not have your location on. Say "Locate me", to retrieve your location');
    conv.ask(new Suggestions(['Locate me', 'Exit']));

    }
});





//TO BEGIN RECORDING RUNNING TIME
app.intent('running_prompt', (conv) => {
    if (conv.data.area) {  //If blank to ensure location permission is allowed indirectly as a location is set already	  	
        const deviceCoordinatesStart = conv.device.location.coordinates;
        const latitudeValueStart = deviceCoordinatesStart.latitude;
        const longitudeValueStart = deviceCoordinatesStart.longitude;

        //SAVING LAT AND LONG
        conv.data.latitudeValueStart = latitudeValueStart
        conv.data.longitudeValueStart = longitudeValueStart

        let start = moment(); //Start time in UTC, you could also use dateTime()
        conv.data.starts = start; //Saving start time in context/session  // Saves in the T...Z format
        let startTz = momentTz(); //used because of getting the Timezone
        const timestamp = 1402629305; // Just a dud placeholder to fulfil timezone function

        //GEOLOCATION REVERSAL 
        return geocoder.reverse({lat:latitudeValueStart, lon:longitudeValueStart}).then((err, res) => {
                if (err) {
                console.log(err);
            }
            let startLocation = res[0].administrativeLevels.level1long; //To call address like, IKEJA
            conv.data.startLocation = startLocation; //Start location saved for session
        
                //GETTING LOCAL TIMEZONE FROM LAT/LONG AND TIMESTAMP, TO BE USED IN CONJUNCTION WITH BELOW
                //The reason for nesting this inside geocoder is to enable, the use/subsequent storage of it's local variable - startLocation
                /*A function defined inside another function (as is in this case here) can also access all variables defined in its parent function and any other variable to which the parent function has access.*/
                // timezone.data(latitudeValueStart, longitudeValueStart, timestamp, (err, tz) => { 
                // if (err) {
                //     console.log(err);
                //     }
                // var zoneHolder = tz.raw_response.timeZoneId;  
                // const localTime = startTz.tz(zoneHolder).format('LLL'); //E.g start.tz('America/Los_Angeles').format('ha z');
                // conv.data.localTime = localTime; //Saved just for BigQuery sake
                //     // app.ask('Your race starts by ' + localTime + 'at' + startLocation);
                // conv.ask('Your race starts now, ' + localTime);
                // conv.ask(new Suggestions('End Race'));
                // });
                return conv.ask('Your race starts now, ' + startLocation);
            });
    } else {  //Returned if permission not granted
        conv.data.runningContext = 'yes'; //Just to set a placeholder to avoid the save location prompt(when you choose 'Locate me') on segueing from here RUNNING  
        conv.ask('You do not have your location on. Say "Locate me", to retrieve your location');
        conv.ask(new Suggestions(['Locate me', 'Exit']));
    }
});





//TO BEGIN RECORDING RUNNING TIME
app.intent('running_prompt', async (conv) => {
    if (conv.data.area) {  //If blank to ensure location permission is allowed indirectly as a location is set already	  	
        const deviceCoordinatesStart = conv.device.location.coordinates;
        const latitudeValueStart = deviceCoordinatesStart.latitude;
        const longitudeValueStart = deviceCoordinatesStart.longitude;

        //SAVING LAT AND LONG
        conv.data.latitudeValueStart = latitudeValueStart
        conv.data.longitudeValueStart = longitudeValueStart

        let start = moment(); //Start time in UTC, you could also use dateTime()
        conv.data.starts = start; //Saving start time in context/session  // Saves in the T...Z format
        let startTz = momentTz(); //used because of getting the Timezone
        const timestamp = 1402629305; // Just a dud placeholder to fulfil timezone function

        //GEOLOCATION REVERSAL 
        let res = await geocoder.reverse({lat:latitudeValueStart, lon:longitudeValueStart}) ;
            let startLocation = res[0].administrativeLevels.level1long; //To call address like, IKEJA
            conv.data.startLocation = startLocation; //Start location saved for session
        
            let tz = await timezone.data(latitudeValueStart, longitudeValueStart, timestamp);
                var zoneHolder = tz.raw_response.timeZoneId;  
                const localTime = startTz.tz(zoneHolder).format('LLL'); //E.g start.tz('America/Los_Angeles').format('ha z');
                conv.data.localTime = localTime; //Saved just for BigQuery sake
                    // app.ask('Your race starts by ' + localTime + 'at' + startLocation);
                conv.ask('Your race starts now, ' + localTime);
                conv.ask(new Suggestions('End Race'));

    } else {  //Returned if permission not granted
        conv.data.runningContext = 'yes'; //Just to set a placeholder to avoid the save location prompt(when you choose 'Locate me') on segueing from here RUNNING  
        conv.ask('You do not have your location on. Say "Locate me", to retrieve your location');
        conv.ask(new Suggestions(['Locate me', 'Exit']));
    }
});






https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY
const http = require('http');
const host = 'maps.googleapis.com';
const ts = 1458000000;
const apiKey = AIzaSyAO2FyCME_lvAIK9kNt42AkjOL58xwcp6s;


function callTimezoneApi(lat, lon) {
	return new Promise((resolve, reject) => {
         let path = '/maps/api/timezone/json?location=' + lat +
          ',' + lon + '&timestamp=' + ts + '&key=' + apiKey;
         console.log('API Request: ' + host + path);
         // Make the HTTP request to get the weather
         http.get({
          host: host,
          path: path
         }, (res) => {
              let body = ''; // var to store the response chunks
              res.on('data', (d) => {
               body += d;
              }); // store each response chunk
              res.on('end', () => {
                   let response = JSON.parse(body);
                   let zoneHolder = response.timeZoneId;
                   const localTime = startTz.tz(zoneHolder).format('LLL');
                   console.log(localTime);
                   resolve(localTime);
              });
          res.on('error', (error) => {reject(error);});
        });
    });
};





geocoder.reverse({lat:45.767, lon:4.833})
  .then(function(res) {
    console.log(res[0].administrativeLevels.level1long);
  })
  .catch(function(err) {
    console.log(err);
  });



  geocoder.reverse({lat:45.767, lon:4.833})
  .then(function(res) {
        console.log(res[0].administrativeLevels.level1long);
    })
  .then(callTimezoneApi(X, Y).then((output) => {
        console.log(output + 'Hello');

    }))
  .catch(function(err) {
    console.log(err);
  });
  




  geocoder.reverse({lat:45.767, lon:4.833})
  .then(function(res) {
    console.log(res[0].administrativeLevels.level1long);
  })
  .then(callTimezoneApi(X, Y))
  .then(callTimezoneApi(X, Y).then((output) => {
		    console.log(output + 'Hello');

		  }))
  .catch(function(err) {
    console.log(err);
  });
  
  callTimezoneApi(X, Y).then((output) => {
		    console.log(output + 'Hello');
		  })
            .catch(function(err) {
    console.log(err);
  });




// v2
const app = dialogflow();

const asyncTask = () => new Promise(
  resolve => setTimeout(resolve, 1000)
);

app.intent('Default Welcome Intent', conv => {
  return asyncTask()
    .then(() => conv.ask('I took one second to run'));
});





//WORKED , BUT RETURNS PLACE AS UNDEFINED

// eslint-disable-next-line promise/catch-or-return
        return geocoder.reverse({lat:latitudeValueStart, lon:longitudeValueStart})
        // eslint-disable-next-line promise/always-return
        .then((res) => {
            console.log(res[0].administrativeLevels.level1long);
            let startLocation = res[0].administrativeLevels.level1long; //To call address like, IKEJA
            conv.data.startLocation = startLocation; //Start location saved for session
            // return
          }) .then(
         callTimezoneApi(latitudeValueStart, longitudeValueStart)
        // eslint-disable-next-line promise/always-return
        .then((localTime) => {
            conv.data.localTime = localTime;
            // showLocationOnScreen(conv);
            conv.ask('Your race starts now, ' + localTime + conv.data.startLocation);
            conv.ask(new Suggestions('End Race'));
          }));




///WORKS TOO 
return new Promise( (( resolve, reject ) => {
    // Reverse Geocoding
    geocoder.reverse({lat:latitudeValueStart, lon:longitudeValueStart},(err,data) => {
      if (err) {
        console.log(err)
        reject( err );
      } else {
        let startLocation = data[0].administrativeLevels.level1long;
        conv.data.startLocation = startLocation
        conv.ask('Your race starts now, ' + conv.data.startLocation);  
        resolve()
      }
   })
   }));

//FOR TIME

        return callTimezoneApi(latitudeValueStart, longitudeValueStart)
        // eslint-disable-next-line promise/always-return
        .then((localTime) => {
            conv.data.localTime = localTime;
            conv.ask('Your race starts now, ' + localTime);              // showLocationOnScreen(conv);
            conv.ask(new Suggestions('End Race'));
          });