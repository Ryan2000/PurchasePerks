$(document).ready(function() {
    function restaurantInformation(){
        var restaurants = {
            restaurantArray:
                [{restaurantName: "SweetGreen",
                    itemOne: "Kale Caesar",
                    itemTwo: "Spicy Sabzi",
                    itemThree: "Rad Thai",
                    itemFour: "Watermelon Cilantro Fresca"},
                    {restaurantName: "Sweetfin Poke",
                        itemOne: "Spicy Tuna",
                        itemTwo: "Mango Albacore",
                        itemThree: "Kale Snapper",
                        itemFour: "Spicy Yuzu Salmon"},
                    {restaurantName: "Verve Coffee",
                        itemOne: "Farm Level Reserve",
                        itemTwo: "Santa Clara",
                        itemThree: "Amada Fernandez",
                        itemFour: "The 1950"}
                ]
        };
        $("#restaurant-history").click(function () {
            var functions = [];
            var div = $("#restaurant-insert");
            for (var i = 0; i < restaurants.restaurantArray.length; i++) {
                var btn = $(document.createElement("button"));
                var ctr = restaurants.restaurantArray[i].restaurantName;
                var txt = $(document.createTextNode(ctr));
                // This sets the restaurant names to the buttons
                var restaurantButtons = btn.append(txt).attr("type", "button").attr("onclick", functions[i]).attr("id", "button" + ctr[i]);
                div.append(btn);
                ctr++;
                // This tells you what you ordered when you click the specific restaurant
                $("#buttonS").click(function () {
                    function stopBubble() {
                        if (e && e.stopPropagation)
                            e.stopPropagation();
                        else
                            window.event.cancelBubble = true;
                    }
                    var functions2 = [];
                    var div2 = $("#menu-insert");
                    // for (var i = 0; i < restaurants.restaurantArray.length; i++) {
                    // var btn2 = $(document.createElement("div"));
                    var ctr2 = restaurants.restaurantArray[0].itemOne;
                    var txt2 = $(document.createTextNode(ctr2));
                    console.log(txt2);
                    // var restaurantButtons2 = btn2.append(txt2).attr("type", "text").attr("onclick", functions2).attr("id", "button" + ctr2);
                    div2.append(txt2);
                    // stopBubble(e);
                    // }
                })
            }
        });
        // This ends the restaurant information
    }

    //click events from main page.
    $("#log-in-btn").click(function () {
        $('#my-modal').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    });

    $("#sign-up-btn").click(function () {
        $('#my-modal1').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    });
    // API Information
    // var config = {
    //     apiKey: "AIzaSyBTbLznAEyQGm8Wgr-xAxPLJ9Fon3KF4_o",
    //     authDomain: "purchaseperks.firebaseapp.com",
    //     databaseURL: "https://purchaseperks.firebaseio.com",
    //     projectId: "purchaseperks",
    //     storageBucket: "purchaseperks.appspot.com",
    //     messagingSenderId: "172023201216"
    // };
    // firebase.initializeApp(config);


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDDa_TpnsyZCVAhb4Ax80lxpbLw7ekoEfw",
        authDomain: "purchaseperks-ryan.firebaseapp.com",
        databaseURL: "https://purchaseperks-ryan.firebaseio.com",
        projectId: "purchaseperks-ryan",
        storageBucket: "purchaseperks-ryan.appspot.com",
        messagingSenderId: "814610225207"
    };
    firebase.initializeApp(config);


    var database = firebase.database();
    var firstName = "";
    var lastName = "";
    var email = "";
    var userName = "";
    var passwordInput = "";
    var dateOfBirth = "";
    var cellPhoneNumber = "";
    var registrationDate = "";
    function dateFunction(){
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var dateOutput = ((''+month).length<2 ? '0' : '') + month +'/' + ((''+day).length<2 ? '0' : '') + day
            + '/' + d.getFullYear();
        return dateOutput;
    }
// ------------------------------------------------------------------------------------
    $("#add-user-btn").on("click", function(event){
        event.preventDefault();
        firstName = $("#first-name").val().trim();
        lastName = $("#last-name").val().trim();
        email = $("#email-input").val().trim();
        userName = $("#user-name").val().trim();
        passwordInput = $("#password-input").val().trim();
        dateOfBirth = $("#date-of-birth").val().trim();
        cellPhoneNumber = $("#cell-phone-number").val().trim();
        registrationDate = dateFunction();
        database.ref('customers/').push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            passwordInput: passwordInput,
            dateOfBirth: dateOfBirth,
            cellPhoneNumber: cellPhoneNumber,
            registrationDate: registrationDate
        })
        $("#first-name").val("");
        $("#last-name").val("");
        $("#email-input").val("");
        $("#user-name").val("");
        $("#password-input").val("");
        $("#date-of-birth").val("");
        $("#first-name").val("");
        $("#cell-phone-number").val("");
        // use this piece of code when the user clicks the profile/settings page
        $("#pull-user-btn").on("click", function(event){
            $("#pull-firstName-data").append("<div class = 'form-group'>"
                + "<strong>First Name:</strong> "+ firstName + "</div>");
            $("#pull-lastName-data").append("<div class = 'form-group'>"
                + "<strong>Last Name:</strong> " + lastName + "</div>");
            $("#pull-email-data").append("<div class = 'form-group'>"
                + "<strong>Email:</strong> " + email + "</div>");
            $("#pull-userName-data").append("<div class = 'form-group'>"
                + "<strong>User Name:</strong> " + userName + "</div>");
            $("#pull-passwordInput-data").append("<div class = 'form-group'>"
                + "<strong>Password:</strong> " + passwordInput + "</div>");
            $("#pull-dateOfBirth-data").append("<div class = 'form-group'>"
                + "<strong>Date of Birth:</strong> " + dateOfBirth + "</div>");
            $("#pull-cellPhoneNumber-data").append("<div class = 'form-group'>"
                + "<strong>Cell Phone:</strong> " + cellPhoneNumber + "</div>");
            $("#pull-registrationDate-data").append("<div class = 'form-group'>"
                + "<strong>Registration Date:</strong> " + registrationDate + "</div>");
        })
    });
    // <button type="button" id="restaurant-history">Purchase History</button>
    // <div id="restaurant-insert"></div>
    // <div id="menu-insert"></div>
    //Populate the db
    function populateDb(){
        var hitApi;
        database.ref().once('value').then(function(snapshot){
            hitApi = snapshot.val().populate_db;
            if (hitApi){
                var amountOfUsers = 2;
                var urlLink = "https://randomuser.me/api/?results=" + amountOfUsers;

                $.ajax({
                    url: urlLink,
                    dataType: 'json',
                    success: function(data){
                        var customers = database.ref('customers/')

                        for(var i = 0; i < amountOfUsers; i++){
                            var customer = {
                                first_name : data.results[i].name.first,
                                last_name : data.results[i].name.last,
                                email: data.results[i].email,
                                user_name : data.results[i].login.username,
                                password: data.results[i].login.password,
                                dob: data.results[i].dob,
                                cell: data.results[i].cell,
                                thumbnail: data.results[i].picture.thumbnail,
                                registered: data.results[i].registered
                            };

                            customers.push(customer);
                        }

                        var updates = {'populate_db': false};
                        database.ref().update(updates);
                    }
                });
            }
        });
    }
    populateDb(); //to blow out db set customers to blank string, and populate db to true

    //authenticating a user
    function authenticate(userName, password, onSuccess, onDenied, onNotFound){
        database.ref('customers/').once('value').then(function(snapshot){
            var found = false;
            snapshot.forEach(function(child){
                var user_name = child.val().user_name;
                var pw = child.val().password;

                if(userName === user_name && password === pw){
                    if(onSuccess){
                        onSuccess(child.val());
                    }
                    found = true;
                } else if (userName === user_name && password !== pw){
                    if(onDenied){
                        onDenied(userName);
                    }
                    found = true;
                }
                return true;
            });
            if (!found){
                if(onNotFound){
                    onNotFound(userName);
                }
            }
        });
    }

    //click listener for authenticating username and password
    $('#login-submit-btn').click(function(){
        var user = $('#InputUserName').val();
        var pw = $('#InputPassword').val();

        authenticate(user, pw, function(user){
                alert(user.first_name);
            },
            function(user_name){
                alert('Access denied for user ' + user_name);
            }, function(user_name){
                alert('No account associated with user ' + user_name);
            });
    });


});


