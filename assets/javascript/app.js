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



    var currentTime = moment().format("HH:mm a");
    console.log(currentTime);

    var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log("firstTime:" + firstTime);
    
    var trainDifference = moment().diff(moment(firstTime), "minutes");
    console.log("trainDifference:" + trainDifference);
    
    var timeLeft = trainDifference % trainFreq;
    console.log("timeLeft:" + timeLeft);
    
    var minutesAway = trainFreq - timeLeft;
    console.log("minutesAway:" + minutesAway);
    
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log("nextTrain:" + nextTrain);
    


$(".train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
trainFreq + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td><td>");































});
});