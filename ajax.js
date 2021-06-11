/* UC1:- Demonstrate Async nature of JavaScript.
         - Note: It is similar to Main thread invoking another Activity which are processed by child Thread.
         - Run the JS code using Node Compiler. 
*/

function showTime(){
    const date= new Date();
    return date.getHours()+" Hrs "+date.getMinutes()+" Mins "+date.getSeconds()+" Secs"
}
function showSessionExpire(){
    console.log("Activity B has been expired at "+showTime());
}
console.log("Activity A Triggering Activity B at "+showTime());
setTimeout(showSessionExpire,5000);
console.log("Activity B Triggered at "+showTime()+" will execute after 5seconds");


/* UC2:- Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX.
         - Run the JS code using Node Compiler. 
         - Run npm install xmlhttprequest.
*/

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date= new Date();
    return date.getHours()+" Hrs "+date.getMinutes()+" mins "+date.getSeconds()+" s."
}
const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data at: " + showTime() + " data: " +data)
 } 
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at "+showTime());
const deleteURL = "http://localhost:3000/employees/2";
function userDeleted(data){
   console.log("User Deleted at: " + showTime() + " data: "+data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX Call to Server at "+showTime());

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Shekhar","salary": "45000"};
function userAdded(data){
   console.log("User Added at: " + showTime() + " data: "+data)
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX Call to Server at "+showTime());
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){ 
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error at: "+showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
     } else xhr.send();
    console.log(methodType+ " request sent to the server at "+showTime());
}