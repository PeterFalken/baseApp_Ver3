/**
 * Created by luis on 11/8/14.
 */
(function () {
    var app = angular.module('baseApp', []);

    app.controller('LoginController', function () {
        this.user = {};
        this.loggedIn = false;
        this.credentials = {};

        this.isLoggedIn = function(){
            return typeof this.user === 'undefined';
        }

        this.checkCredentials = function () {
            if(this.loggedIn)
                this.loggedIn = false;
            else
                this.loggedIn = true;
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