/**
 * Created by luis on 11/9/14.
 */
(function(){
    var app = angular.module('SystemLogin',[]);

    app.directive("userLogin", function(){
        return {
            restrict: 'E',
            templateUrl: "resources/directives/user-login.html",
            controller: function (){
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
            },
            controllerAs: 'loginCtrl'
        };
    });
})();