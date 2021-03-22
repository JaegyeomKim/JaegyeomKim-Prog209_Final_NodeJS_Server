var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))


//	테스트 코드를 가져옴
let serverInfoArray = [];
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

//  HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET VisitVisitVisitVisitVisitVisitVisit. */
//http://localhost:3000/visit 에 정보가 입력됨
app.get('/visitList', function (req, res) {
    res.json(serverInfoArray);
});

/* POST to addInformation */
app.post('/addInfor', function (req, res) {
    console.log(req.body);
    serverInfoArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
});

// error page 
app.get('/error', function (req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject = {
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
