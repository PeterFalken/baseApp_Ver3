/**
 * Created by luis on 11/9/14.
 */
(function () {
    var app = angular.module('SystemLogin', []);

    app.directive("userLogin", function () {
        return {
            restrict: 'E',
            templateUrl: "resources/angular/directives/user-login.html",
            controller: function () {
                // Good practices
                var self = this;
                // Stores user session information.
                self.user = {};
                // Is the user logged into the system.
                self.loggedIn = false;
                // Temporary storage of user's credentials before check.
                self.credentials = {};

                // Check user credentials on the backend.
                self.checkCredentials = function () {
                    if (self.loggedIn)
                        self.loggedIn = false;
                    else
                        self.loggedIn = true;

                    // Don't forget to set 'loggedIn'
                    // this.loggedIn = true or false - depending on outcome of check.
                    // Remove user credentials after check
                    self.credentials = {};
                }
            },
            controllerAs: 'loginCtrl'
        };
    });
})();