let inforarry = [];
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



//inforarry.push(new inforObject(
//    'Kay',
//    'Male',
//    '1994.12.15',
//    'kay1215@gmail.com',
//    'General',
//    ' Fever, Cough',
//    ["BellevueCollege",
//        "2021. 02. 10",
//        "AM 08:30",
//        "PM 2:30"],
//    "I am Kay"))

document.addEventListener("DOMContentLoaded", function () {

    createList()

    // HealthCondition -> Submibutton -> Push informaion to inforarry
    document.getElementById('submitButton').addEventListener("click", function () {

        let symptoms = [];

        $("input[name='symptoms']:checked").each(function (e) {
            var value = $(this).val();
            symptoms.push(value);
        })


        $("input[name='path']").each(function (e) {
            var value = $(this).val()
            pathlist.push(value);
        })
        if (symptoms.length === 0 && document.getElementById('select-condition').value == 'General') {

        }
        else {
            let addinfo = new inforObject(
                document.getElementById('userName').value,
                document.getElementById('gender').value,
                document.getElementById('birth').value,
                document.getElementById('email').value,
                document.getElementById('select-condition').value,
                symptoms,
                pathlist,
                document.getElementById('firstComment').value)

                addNewinfor(addinfo) //새로온녀석 **********************   
        }

        alert('Completed')

        createList()

        delinput()

        });


    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#Visit", function (event) {   // have to use jQuery 
        FillArrayFromServer();
        //createList();
    });


    document.getElementById("buttonAdd").addEventListener('click', function () {
        let addPathList = document.getElementById("path_list")
        var form = document.createElement('form')
        form.className = "js_form"

        for (let i = 0; i < 4; i++) {
            if (i == 0) {
                let input = document.createElement('input')
                input.setAttribute("type", "text")
                input.setAttribute('name', 'path')
                input.setAttribute('value', "Add Location")
                input.setAttribute('id', 'path')

                form.appendChild(input)
            }
            else if (i == 1) {
                let input = document.createElement('input')
                input.setAttribute("type", "date")
                input.setAttribute('name', 'path')
                input.setAttribute('id', 'path')

                form.appendChild(input)
            }
            else if (i == 2) {
                let input = document.createElement('input')
                input.setAttribute("type", "time")
                input.setAttribute('name', 'path')
                input.setAttribute('id', 'path')

                form.appendChild(input)
            }
            else if (i == 3) {
                let input = document.createElement('input')
                input.setAttribute("type", "time")
                input.setAttribute('name', 'path')
                input.setAttribute('id', 'path')

                form.appendChild(input)
            }
        }
        addPathList.appendChild(form)

    })

    document.getElementById('buttonDel').addEventListener('click', function () {
        //let elements = document.getElementsByClassName('js_form')
        //let path = document.getElementById('path');
        //elements.removeChild(path);
        for (i = 0; i < 4; i++) {
            $("#path").remove();
        }
    })



    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
        if (document.getElementById("IDparmHere".innerHTML == "change1")) {
            alert("Sorry, temporary error, please try again");
            document.location.href = "index.html#Visit";
        }
        else {
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        console.log(inforarry[arrayPointer])
        document.getElementById("oneName").innerHTML = "Name: " + inforarry[arrayPointer].Name;
        document.getElementById("oneBirth").innerHTML = "Birth: " + inforarry[arrayPointer].Birth;
        document.getElementById("oneGender").innerHTML = "Gender: " + inforarry[arrayPointer].Gender;
        document.getElementById("oneEmail").innerHTML = "Email: " + inforarry[arrayPointer].Email;
        }
    });




});









function createList() {
    let PathList = document.getElementById('divPathList');
    while (PathList.firstChild) {
        PathList.removeChild(PathList.firstChild)
    }

    let ul = document.createElement("ul");


    inforarry.forEach(function (element,) {
        let li = document.createElement('li');
        li.classList.add('onePath'); //디테일 떄문에
        li.setAttribute("data-parm", element.ID); // 디테일 떄문에
        li.innerHTML = "Location:  " + element.Path + " Situation: " + element.Situation + " (" + element.Symptoms + ")";
        ul.appendChild(li);
    });

    PathList.appendChild(ul);



    var liArray = document.getElementsByClassName("onePath");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

}


function delinput() {
    document.getElementById('userName').value = "",
        document.getElementById('gender').value = "",
        document.getElementById('birth').value = "",
        document.getElementById('email').value = "",
        document.getElementById('firstComment').value = ""
    $(document).bind("change", "#select-condition", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });
}


function GetArrayPointer(localID) {
    for (let i = 0; i < inforarry.length; i++) {
        if (localID === inforarry[i].ID) {
            return i;
        }
    }
}


function shareInfo(whichToAdd) {
    let ul = document.getElementById("sharedInfo");
    let li = document.createElement("li");
    let firstComment = document.createTextNode(document.getElementById(whichToAdd).value);
    li.append(firstComment);
    li.append(" ");
    ul.append(li);
    // let p = document.getElementById("sharedInfo");
    // let firstComment = document.createTextNode(document.getElementById(whichToAdd).value);
    // p.append(" ");
    // p.append(firstComment);
    // p.append(" ");
};

//서버에서 데이터 가져오기 
function FillArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/visitList')
    .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
    console.log(serverData);
    inforarry.length = 0;  // clear array
    inforarry = serverData;   // use our server json data which matches our objects in the array perfectly
    createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
    })
    .catch(function (err) {
     console.log(err);
    });
};







    //새로운 경로 업데이트
    function addNewinfor(addinfo){
        // the required post body data is our movie object passed into this function
            
            // create request object
            const request = new Request('/addInfor', {
                method: 'POST',
                body: JSON.stringify(addinfo),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            
          // use that request object we just created for our fetch() call
          fetch(request)
          // wait for frist server promise response of "200" success 
          // (can name these returned promise objects anything you like)
             .then(function (theResonsePromise) {    // the .json sets up 2nd promise
              return theResonsePromise.json()  })
           // now wait for the 2nd promise, which is when data has finished being returned to client
              .then(function (theResonsePromiseJson) { 
                console.log(theResonsePromiseJson.toString()), 
                document.location.href = "#Visit" 
                })
          // the client console log will write out the message I added to the Repsonse on the server
          .catch(function (err) {
              console.log(err);
          });
        }; // end of addNewMovie