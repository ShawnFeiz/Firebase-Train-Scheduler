



$(".submitBtn").on("click", function(event){
    event.preventDefault();

    var trainName = $(".trainName").val().trim();
    var trainDest = $(".destination").val().trim();
    var trainTime = $(".firstTrain").val().trim();
    var trainFreq = $(".frequency").val().trim();


    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq 
    };

});