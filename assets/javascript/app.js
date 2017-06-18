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
                        item: "Mango Albacore",
                        item: "Kale Snapper",
                        item: "Spicy Yuzu Salmon"},
                    {restaurantName: "Verve Coffee",
                        itemOne: "Farm Level Reserve",
                        item: "Santa Clara",
                        item: "Amada Fernandez",
                        item: "The 1950"}
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
    })
    $("#sign-up-btn").click(function () {
        $('#my-modal1').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    })
    // API Information
    var config = {
        apiKey: "AIzaSyBTbLznAEyQGm8Wgr-xAxPLJ9Fon3KF4_o",
        authDomain: "purchaseperks.firebaseapp.com",
        databaseURL: "https://purchaseperks.firebaseio.com",
        projectId: "purchaseperks",
        storageBucket: "purchaseperks.appspot.com",
        messagingSenderId: "172023201216"
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
        database.ref().push({
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
});


