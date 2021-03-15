var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))










//	테스트 코드를 가져옴
let serverinforarry = [];
let pathlist = [];

// define a constructor to create User's information objects
let inforObject = function (pName, pGender, pBirth, pEmail, pSituation, pSymptoms, pPath, pInformation) {
    //this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.ID = Math.random().toString(16).slice(5)
    this.Name = pName;
    this.Gender = pGender;
    this.Birth = pBirth;
    this.Email = pEmail;
    this.Situation = pSituation;
    this.Symptoms = pSymptoms;
    this.Path = pPath;

    this.Information = pInformation;
}

serverinforarry.push(new inforObject(
    'Kay',
    'Male',
    '1994.12.15',
    'kay1215@gmail.com',
    'General',
    ' Fever, Cough',
    ["BellevueCollege",
        "2021. 02. 10",
        "AM 08:30",
        "PM 2:30"],
    "I am Kay"))









//  HTML
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET VisitVisitVisitVisitVisitVisitVisit. */
//http://localhost:3000/visit 에 정보가 입력됨
app.get('/visitList', function(req, res) {
    res.json(serverinforarry);
});
















// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(3000);  // setting port number 
console.log('3000 is the magic port');

module.exports = app;
