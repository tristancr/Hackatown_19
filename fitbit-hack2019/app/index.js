import document from "document";
import clock from "clock";
import { user } from "user-profile";
import * as fs from "fs";
import { outbox } from "file-transfer";
import * as messaging from "messaging";
import { geolocation } from "geolocation";

/*
*   Calls the right function
*/
document.getElementById("btn-no").addEventListener("click", sendDate);

function sendDate(){
  console.log("DEBUG: sendDate");
  var toSend = createData();
  connectSocket(toSend); // Calls sendMessage
}


/*
*   Huge function creates the data that will be sent
*/
function createData() {
  /*
  *   Create the user's data that will be sent
  */
  var userMetrics = {
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      restingHeartRate: user.restingHeartRate,
  }

  /*
  *   Geolocalisation data
  */
  geolocation.getCurrentPosition(locationSuccess, locationError);

  function locationSuccess(position) {
      userMetrics["latitude"] = position.coords.latitude;
      userMetrics["longitude"] = position.coords.longitude;
  }

  function locationError(error) {
    console.log("Something went wrong...",
                "Error: " + error.code,
                "Message: " + error.message);
  }
  
  console.log("DEBUG: createData");
  return userMetrics;
}


/*
*   Sending the data to the cellphone
*/

function connectSocket(data){
   messaging.peerSocket.onopen = function() {
     sendMessage(data);
   }

  messaging.peerSocket.onerror = function(err) {
    console.log("Connection error: " + err.code + " - " + err.message);
  }
  console.log("DEBUG: connectData");
}


function sendMessage(data) {
      console.log("DEBUG: OVER HERE");
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log("DATA SENT");
    messaging.peerSocket.send(data);
  }
    
}

/* GESTION DES DATES */
let myClock = document.getElementById("myClock");
clock.granularity = 'seconds'; // seconds, minutes, hours
clock.ontick = function(evt) {
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                 ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                 ("0" + evt.date.getSeconds()).slice(-2);
};
const dayLabel = document.getElementById("dayLabel");
const dateLabel = document.getElementById("dateLabel");

let today = new Date(); // or get this from the tick event (evt.date)
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let dayName = days[today.getDay()];
dateLabel.text = today.getDate();
dayLabel.text = dayName;

// // views

// let container = document.getElementById("container");

// // Get the selected index
// let currentIndex = container.value;

// // Set the selected index
// container.value = 0; // jump to first slide
