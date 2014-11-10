/**
 * Created by luis on 11/8/14.
 */
(function () {
    var app = angular.module('baseApp', ['SystemLogin']);
    // var userSession = {};
    // var loggedIn = false;

    app.controller('AppUserDirectoryController', function () {
        this.directoryLetters = ['A','B','C'];

        this.appUserForLetter = function(letter){
            if(letter){
                //get AppUsers for Letter.
                console.log("We have appUsers for: " + this.directoryLetters[0]);
            }
        };
    });

})();