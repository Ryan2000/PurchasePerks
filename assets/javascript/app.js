


$(document).ready(function() {

    // API Information
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
    var database = firebase.database(); //root node
    var customersRef = database.ref('customers'); //customers variable (node)
    var populateDbRef = database.ref('populate_db'); //populate_db variable (node)


    function dateFunction(){
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var dateOutput = ((''+month).length<2 ? '0' : '') + month +'/' + ((''+day).length<2 ? '0' : '') + day
            + '/' + d.getFullYear();
        return dateOutput;
    }

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
    $("#log-in-btn").click(function () {
        $('#my-modal').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    });

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

    $("#sign-up-btn").click(function () {
        $('#my-modal1').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    });

// ------------------------------------------------------------------------------------

    //this function pushes info into customers database from sign up form (add user)
    $("#add-user-btn").on("click", function(event){
        event.preventDefault();
        var firstName = $("#first-name").val().trim();
        var lastName = $("#last-name").val().trim();
        var email = $("#email-input").val().trim();
        var userName = $("#user-name").val().trim();
        var passwordInput = $("#password-input").val().trim();
        var dateOfBirth = $("#date-of-birth").val().trim();
        var cellPhoneNumber = $("#cell-phone-number").val().trim();
        var registrationDate = dateFunction();

        createCustomer (firstName,
            lastName,
            email,
            userName,
            passwordInput,
            dateOfBirth,
            cellPhoneNumber,
            '',
            registrationDate);


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

    //Populate the db with our user generated api info into customers db
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
                            var newCustomer = createCustomer (data.results[i].name.first,
                                data.results[i].name.last,
                                data.results[i].email,
                                data.results[i].login.username,
                                data.results[i].login.password,
                                data.results[i].dob,
                                data.results[i].cell,
                                data.results[i].picture.thumbnail,
                                data.results[i].registered);
                            addPuchaseHistory(newCustomer, 'SweetGreen', '6/19/2017', ['Steak', 'Tunda']);
                        }

                        var updates = {'populate_db': false};
                        database.ref().update(updates);
                    }
                });
            }
        });
    }
    populateDb();


    //authenticating a user
    function authenticate(userName, password, onComplete) {
        customersRef.once('value').then(function (snapshot) {
            var result;
            var found = false;
            snapshot.forEach(function (ch) {
                var user_name = ch.val().user_name;
                var pw = ch.val().password;

                if (userName === user_name && password === pw) {
                    result = ch.key;
                    found = true;
                } else if (userName === user_name && password !== pw) {
                    result = 'denied';
                    found = true;
                }
                if(found)
                return true;
            });
            if (!found) {
                result = 'not found';
            }
            if(onComplete){
                onComplete(result);
            }
        });
    }


    //click listener for authenticating username and password
    $('#login-submit-btn').click(function(){
        var user = $('#InputUserName').val();
        var pw = $('#InputPassword').val();

        authenticate(user, pw, function(result){
                alert(result);
            $('#my-modal').modal('hide'); //hide the login form
        });
    });


    //add purchase history with those parameters
    function addPuchaseHistory(customerPk, restaurantName, visitDate, itemArray){
        var purchase = {
            resturant: restaurantName,
            date: visitDate,
            items: itemArray
        };
        addOrder(customerPk, purchase);
    }

    //Add an order to the customer using the pk
    function addOrder(customerPk, order){
        var customer = database.ref('customers/' + customerPk);
        customer.push(order);
    }

    // function to create a new customer.  now all properties match in db
    function createCustomer (_firstName, _lastName, _email, _userName, _password, _dob, _cell, _thumbnail, _registered){
        var customer = {
            first_name : _firstName,
            last_name : _lastName,
            email: _email,
            user_name : _userName,
            password: _password,
            dob: _dob,
            cell: _cell,
            thumbnail: _thumbnail,
            registered: _registered
        };
        //add to db
        var newCustomer = customersRef.push(customer);

        //return pk
        return newCustomer.key;
    }



    //

    // <button type="button" id="restaurant-history">Purchase History</button>
    // <div id="restaurant-insert"></div>
    // <div id="menu-insert"></div>
});


