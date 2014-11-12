/**
 * Created by luis on 11/9/14.
 */
(function () {
    var app = angular.module('SystemLogin', ['AuthenticationModule']);
    app.directive("userLogin", function () {
        return {
            restrict: 'E',
            templateUrl: "resources/angular/directives/user-login.html",
            controller: ['AuthenticationService', function (a_svc) {
                // Good practices
                var self = this;

                // Temporary storage of user's credentials before check.
                self.credentials = {};

                // Check user credentials on the backend.
                self.checkCredentials = function () {
                    //AuthenticationService.checkCredentials(self.credentials);
                    a_svc.checkCredentials(self.credentials);
                    // Remove user credentials after check
                    self.credentials = {};
                }
            }],
            controllerAs: 'loginCtrl'
        };
    });
})();