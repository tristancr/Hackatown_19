import * as messaging from "messaging";
import { me } from "companion";

/*
*   Receive data from device
*/

messaging.peerSocket.onmessage = function(e) {
  console.log("DATA RECEIVED");
  console.log(JSON.stringify(e.data));
}