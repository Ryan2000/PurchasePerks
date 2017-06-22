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
    console.log(selected_user);


    purchaseHistory(selected_user);


    function purchaseHistory(customerPk){
        database.ref('customers/' + customerPk).once('value').then(function(snapshot){
            snapshot.forEach(function (ch){
                var purchase = ch.val();
                if (purchase) {
                    console.log(purchase.items);
                    console.log(purchase.resturant);
                }
            });
        });
    }

});