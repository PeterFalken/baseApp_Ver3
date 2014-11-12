/**
 * Created by luis on 11/10/2014.
 */
(function () {
    var app = angular.module('SessionModule', []);
    app.service('SessionService', [function () {
        var self = this;

        self.isLoggedIn = false;
        self.sessionID = '';
        self.activeUser = [];
        self.systemUser = [];

        self.logout = function () {
            // Logout user on UserAuthentication Service.
            // AuthenticationService.logout(sessionID);

            self.isLoggedIn = false;
            self.sessionID = '';
            self.activeUser = [];
            self.systemUser = [];
        };

        self.getActiveUser = function () {
            if (self.activeUser)
                return self.activeUser;
            else
                return self.systemUser;
        };

        self.getSystemUser = function () {
            return self.systemUser;
        };

    }]);

})();