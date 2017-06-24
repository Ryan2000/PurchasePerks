/**
 * Created by ryanhoyda on 6/21/17.
 */

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


    //define selected user and set equal to local storage
    var selected_user = localStorage.access_user;
    localStorage.setItem('purchaseCount', 0);
    console.log(selected_user);


    purchaseHistory(selected_user); //(selected_user) is customer's primary key
    profile(selected_user); //passing primary key

    //capitalize first letter
    function capitalizeName(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function profile(customerPk){ //accessing primary key per usual
        database.ref('customers/' + customerPk).once('value').then(function(snapshot){

            //name
            var firstName = snapshot.val().first_name;
            var lastName = snapshot.val().last_name;

            //image
            var image = snapshot.val().thumbnail;

            //name and message
            var msg = "Hello, " + capitalizeName(firstName) + " " + capitalizeName(lastName) + "!";
            $('#profile_greeting').text(msg);

            //append profile image to profile
            $('#profile_image').attr("src", image);
        });
    }


    function purchaseHistory(customerPk){
        database.ref('customers/' + customerPk + '/purchistory').once('value').then(function(snapshot){

            //Place to save all restaurant names
            localStorage.setItem('restaurants', []);

            snapshot.forEach(function (ch){
                var purchase = ch.val();


                localStorage.setItem(purchase.restaurant, purchase.items.length);


                //update the purchase history dialogue within this function
                //here your inside the database
                //in order to append code to modals
                $("#purchasehistory").append('<p>Restaurant: ' + purchase.resturant + '</p>'
                    + '<p>Purchase Date: ' + purchase.date + '</p>' + '<p>Items Purchased: ' +
                     purchase.items.join(', ') + '</p>');


                //Update the restaurant name list
                var names = localStorage.restaurant;

                names.push(purchase.resturant);
                //adding purchase.restaurant to names array

                localStorage.setItem('restaurant', names);
                //names is an array

                localStorage.setItem(purchase.resturant, purchase.items.length);
                //purchase.resturant = key
                //puchase.items.length = value;


                console.log(purchase.items);
                console.log(purchase.resturant);
                console.log(purchase.date);



            });

            /////// Call reward status function here.
            rewardStatus();

        });

    }

    //reward status function  -
    function rewardStatus() {
        var names = localStorage.restaurant; //Get all names back from local storage
        var mileStones;


        //Loop through each name
        names.forEach(function(name) {
            //name is the name of a restaurant
            var numPurchases = localStorage.getItem(name); //Returns the number of purchases for a resturant
            if (numPurchases <= 3){
                console.log(name + ": " + numPurchases);
            }
            else if (numPurchases <= 9 && numPurchases > 3) {
                console.log(name + ": " + numPurchases);
            }
            else if (numPurchases > 9 ) {
                console.log(name + ": " + numPurchases);
            }
        });
    }

});


// var emojiArray = [":baby(p):", ":girl(p):", ":boy(p):", ":adult(p):"]
//
// $(document).ready(function() {
//     for( i = 0; i < emojiArray.length; i++){
//         $("#emoji-class").emojidexReplace().append("<div>" + emojiArray[i] + "</div>");
//     }
//     $(".emojidex-plain_text").emojidexAutocomplete();
//     $(".emojidex-content_editable").emojidexAutocomplete();
// });


