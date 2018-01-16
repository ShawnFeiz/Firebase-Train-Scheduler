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

    //log newTrain information
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

  //clear input boxes after clicking
  $(".trainName").val("");
  $(".destination").val("");
  $(".firstTrain").val("");
  $(".frequency").val("");
});

database.ref().on("child_added", function(snapshot, prevChildKey) {

    console.log(snapshot.val());

    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var firstTrain = snapshot.val().time;
    var trainFreq = snapshot.val().freq;

    console.log("========================");
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);

    // var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");





$(".train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
firstTrain + "</td><td>" + trainFreq + "</td><td>" + trainFreq + "</td><td>");




});
















});