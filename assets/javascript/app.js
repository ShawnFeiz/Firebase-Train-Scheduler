$(document).ready(function() {

    
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9oheZRQxgT2478J7wyALgTAx3Zhfk1Jk",
    authDomain: "trainschedular.firebaseapp.com",
    databaseURL: "https://trainschedular.firebaseio.com",
    projectId: "trainschedular",
    storageBucket: "trainschedular.appspot.com",
    messagingSenderId: "376858205018"
  };

firebase.initializeApp(config);

database = firebase.database();

$(".submitBtn").on("click", function(event){
    event.preventDefault();

    //grab data from the input and store them in symantic variables
    var trainName = $(".trainName").val().trim();
    var trainDest = $(".destination").val().trim();
    var firstTrain = $(".firstTrain").val().trim();
    var trainFreq = $(".frequency").val().trim();

    if (trainName === "" && trainDest === "" && firstTrain === "" && trainFreq === "") {
        // alert("You have to enter something!");
        // return false;

        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
         modal.style.display = "block";
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return false;

    };

    //creat new object for a new train
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: firstTrain,
        freq: trainFreq 
    };

    //push newTrain object to the firebase database
    database.ref().push(newTrain);

    //clear input boxes after clicking
    $(".trainName").val("");
    $(".destination").val("");
    $(".firstTrain").val("");
    $(".frequency").val("");
});

database.ref().on("child_added", function(snapshot, prevChildKey) {
    // console.log(snapshot.val());
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var firstTrain = snapshot.val().time;
    var trainFreq = snapshot.val().freq;

    //Grab the current time
    var currentTime = moment().format("hh:mm a");
    // console.log(currentTime);

    //Grab the first time the train arrives based on user input and subtract a year from it
    //we are using hh:mm which is 1...12 and the a represents either am or pm. Nows users
    //don't have to worry about military time if they are not comfortable with it and use 1..12
    //instead
    var firstTime = moment(firstTrain, "hh:mm a").subtract(1, "years");
    // console.log("firstTime:" + firstTime);
    
    //Grab the difference from the current time and the first train arrival
    var trainDifference = moment().diff(moment(firstTime), "minutes");
    // console.log("trainDifference:" + trainDifference);
    
    //Use modulo to grab the remainder of the trainDifference and trainFreq
    var timeLeft = trainDifference % trainFreq;
    // console.log("timeLeft:" + timeLeft);
    
    //Grab the minutes away but subtracting the train frequency from the time left
    var minutesAway = trainFreq - timeLeft;
    // console.log("minutesAway:" + minutesAway);
    
    //Grab the next train coming
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");
    // console.log("nextTrain:" + nextTrain);
    





    // Grab the html table and append a table row with table data of user input and calculations
    // from moment.js
    $(".train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td><td>");
});





$(".clearBtn").on("click", function() {
    $(".trainName").val("");
    $(".destination").val("");
    $(".firstTrain").val("");
    $(".frequency").val("");
});

});