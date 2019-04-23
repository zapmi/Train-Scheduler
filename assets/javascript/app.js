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
    var arrivalTime = $("#inputTime").val().trim();
    // var minsAway = $("inputWork").val().trim();;
    var freq = $("#inputFreq").val().trim();
    // var totalBill = $("#inputBill").val().trim();
    console.log("test");
    console.log(trainName);
    console.log(dest);
    console.log(arrivalTime);
    console.log(freq);


    var employeeObj = {
        trainname: trainName,
        destination: dest,
        arrivalTime: arrivalTime,
        // minutesaway: minsAway,
        frequency: freq,
        // billed: totalBill
    }
    database.ref().push(employeeObj);


});

database.ref().on("child_added", function (child) {
    console.log(child.val());
    var trainName = child.val().trainname;
    var dest = child.val().destination;
    var arrivalTime = child.val().arrivalTime;
    var freq = child.val().frequency;
    var currTime = moment(arrivalTime, 'hh:mm');
    var minsAway = currTime.diff(arrivalTime, 'arrivalTime')
    // var totalBill = minsAway * freq;
    // var duration = moment.duration(endTime.diff(startTime));
    // endTime.diff(startTime, 'hours')
//**************************************** 

// frequency = freq
//next Arrival = nextArrival arrivalTime
//current arrivalTime = current arrivalTime
//minuets away = (current arrivalTime - nextArrival arrivalTime) - freq






/**************************************** */



    //add row to body

    var today = moment().format('HH:mm');
    var trainname = $("<td>").text(trainName);
    var destination = $("<td>").text(dest);
    var frequency = $("<td>").text(freq);
    var arrivalTime = $("<td>").text(arrivalTime);
    var minutesaway = $("<td>").text(minsAway);
    
    // var billed = $("<td>").text(totalBill);

    var tRow = $("<tr>");
    tRow.append(trainname, destination, frequency, arrivalTime, minutesaway);

    var tBody = $("tbody");
    tBody.append(tRow);

    console.log(today);
});