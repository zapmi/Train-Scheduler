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
    var empName = $("#inputName").val().trim();
    var empRole = $("#inputDest").val().trim();
    var empStart = $("#inputTime").val().trim();
    // var monthsWork = $("inputWork").val().trim();;
    var empRate = $("#inputFreq").val().trim();
    // var totalBill = $("#inputBill").val().trim();
    console.log("test");
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);


    var employeeObj = {
        name: empName,
        role: empRole,
        start: empStart,
        // work: monthsWork,
        rate: empRate,
        // billed: totalBill
    }
    database.ref().push(employeeObj);


});

database.ref().on("child_added", function (child) {
    console.log(child.val());
    var empName = child.val().name;
    var empRole = child.val().role;
    var empStart = child.val().start;
    var empRate = child.val().rate;
    var momentInst = moment(empStart, 'MM/DD/YYYY');
    var monthsWork = momentInst.diff(moment(), 'months') * -1;
    var totalBill = monthsWork * empRate;





    //add row to body

    var today = moment().format('MMMM Do YYYY, h:mm:ss a');
    var name = $("<td>").text(empName);
    var role = $("<td>").text(empRole);
    var start = $("<td>").text(empStart);
    var work = $("<td>").text(monthsWork);
    var rate = $("<td>").text(empRate);
    var billed = $("<td>").text(totalBill);

    var tRow = $("<tr>");
    tRow.append(name, role, start, work, rate, billed);

    var tBody = $("tbody");
    tBody.append(tRow);

    console.log(today);
});