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
    var time = $("#inputTime").val().trim();
    // var monthsWork = $("inputWork").val().trim();;
    var freq = $("#inputFreq").val().trim();
    // var totalBill = $("#inputBill").val().trim();
    console.log("test");
    console.log(trainName);
    console.log(dest);
    console.log(time);
    console.log(freq);


    var employeeObj = {
        name: trainName,
        role: dest,
        start: time,
        // work: monthsWork,
        rate: freq,
        // billed: totalBill
    }
    database.ref().push(employeeObj);


});

database.ref().on("child_added", function (child) {
    console.log(child.val());
    var trainName = child.val().name;
    var dest = child.val().role;
    var time = child.val().start;
    var freq = child.val().rate;
    var momentInst = moment(time, 'MM/DD/YYYY');
    var monthsWork = momentInst.diff(moment(), 'months') * -1;
    var totalBill = monthsWork * freq;





    //add row to body

    var today = moment().format('MMMM Do YYYY, h:mm:ss a');
    var name = $("<td>").text(trainName);
    var role = $("<td>").text(dest);
    var start = $("<td>").text(time);
    var work = $("<td>").text(monthsWork);
    var rate = $("<td>").text(freq);
    var billed = $("<td>").text(totalBill);

    var tRow = $("<tr>");
    tRow.append(name, role, start, work, rate, billed);

    var tBody = $("tbody");
    tBody.append(tRow);

    console.log(today);
});