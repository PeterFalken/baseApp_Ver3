/**
 * Created by luis on 11/8/14.
 */
(function () {
    var appUser = {username: 'luis', password: 'password', loggedIn: false};
    var app = angular.module('baseApp', []);

    app.controller('LoginController', function () {
        this.user = appUser;
    });

    app.controller('AppUserDirectoryController', function () {
        this.directoryLetters = "";

        this.appUserForLetter = fucntion(letter){
            if(letter){
                //get AppUsers for Letter.
            }
        };
    });



})();