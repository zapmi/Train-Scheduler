var config = {
    apiKey: "AIzaSyA1Oucq5O3M8lGrr0G11A68xfYtfig4xxM",
    authDomain: "trilogydb-be730.firebaseapp.com",
    databaseURL: "https://trilogydb-be730.firebaseio.com",
    projectId: "trilogydb-be730",
    storageBucket: "trilogydb-be730.appspot.com",
    messagingSenderId: "67739499161"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit-bid").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#inputName").val().trim();
    var dest = $("#inputDest").val().trim();
    var firstTrainInput = $("#inputTime").val().trim();
    var freq = $("#inputFreq").val().trim();

    console.log(firstTrainInput);

    var trainObj = {
        trainname: trainName,
        destination: dest,
        traintime: firstTrainInput,
        frequency: freq,

    }
    database.ref().push(trainObj);

    $("#inputName").val("");
    $("#inputDest").val("");
    $("#inputTime").val("");
    $("#inputFreq").val("");


});

database.ref().on("child_added", function (child) {
    var trainName = child.val().trainname;
    var dest = child.val().destination;
    var firstTrainTime = moment(child.val().traintime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTime);
    var freq = child.val().frequency;

    var diffTime = moment().diff(moment(firstTrainTime), "minutes");
    console.log(diffTime);
    var tRemainder = diffTime % freq;
    var minsAway = freq - tRemainder;
    var nextTrainArrival = moment().add(minsAway, "minutes").format("HH:mm");


    var trainname = $("<td>").text(trainName);
    var destination = $("<td>").text(dest);
    var frequency = $("<td>").text(freq);
    var arrivalTime = $("<td>").text(nextTrainArrival);
    var minutesaway = $("<td>").text(minsAway);
    var tRow = $("<tr>");
    var tBody = $("tbody");

    tBody.append(tRow);
    tRow.append(trainname, destination, frequency, arrivalTime, minutesaway);

});