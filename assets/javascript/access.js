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


    var selected_user = localStorage.access_user;
    localStorage.setItem('purchCount', 0);
    console.log(selected_user);


    purchaseHistory(selected_user);


    function purchaseHistory(customerPk){
        database.ref('customers/' + customerPk + '/purchistory').once('value').then(function(snapshot){
            snapshot.forEach(function (ch){
                var purchase = ch.val();

                //counting number of purchases
                var numPurchases = localStorage.purchaseCount;
                numPurchases++;
                localStorage.setItem('purchaseCount', numPurchases);

                //update the purchase history dialogue within this function
                //here your inside the database
                //in order to append code to modals
                $("#purchasehistory").append('<p>Restaurant: ' + purchase.resturant + '</p>'
                    + '<p>Purchase Date: ' + purchase.date + '</p>' + '<p>Items Purchased: ' +
                     purchase.items + '</p>');

                
                console.log(purchase.items);
                console.log(purchase.resturant);
                console.log(purchase.date);

            });
            /////// Call reward status function here.
        });
    }

    //reward status function  -
    function rewardStatus(){
        var numPurchases = localStorage.purchaseCount;
        var mileStones;
        if (numPurchases <= 3){
            //milesStones = (reference first emoji)
        }
        else if (numPurchases <= 9 && numPurchases > 3) {
            //milesStones = (reference second emoji)
        }
        else if (numPurchases > 9 ) {
            //milesStones = (reference 3rd emoji)
        }
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


