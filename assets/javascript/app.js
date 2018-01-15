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
    var trainTime = $(".firstTrain").val().trim();
    var trainFreq = $(".frequency").val().trim();

    //creat new object for a new train
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
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
});