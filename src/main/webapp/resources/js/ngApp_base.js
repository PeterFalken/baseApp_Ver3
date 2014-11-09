/**
 * Created by luis on 11/8/14.
 */
(function () {
    var app = angular.module('baseApp', []);

    app.controller('LoginController', function () {
        // Stores user session information.
        this.user = {};
        // Is the user logged into the system.
        this.loggedIn = false;
        // Temporary storage of user's credentials before check.
        this.credentials = {};

        // Check user credentials on the backend.
        this.checkCredentials = function () {
            if(this.loggedIn)
                this.loggedIn = false;
            else
                this.loggedIn = true;

            // Don't forget to set 'loggedIn'
            // this.loggedIn = true or false - depending on outcome of check.
            // Remove user credentials after check
            this.credentials = {};
        }
    });

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