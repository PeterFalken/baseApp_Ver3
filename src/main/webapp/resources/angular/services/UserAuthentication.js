/**
 * Created by luis on 11/10/2014.
 */
(function () {
    var app = angular.module('AuthenticationModule', ['SessionModule']);
    app.service('AuthenticationService', ['$http','SessionService', function($http, s_svc){
        // URL for backend services.
        var url = 'rest/loginServices';
        // Good practices
        var self = this;

        self.checkCredentials = function(credentials) {
            /*
            $http.post(url,{credentials: credentials}).success(function(answer){
                console.log('The server replied: ' + answer);
                s_svc.systemUser = answer.data;
                self.credentials = {};
            });
            */

            // Test for mockup verification
            s_svc.isLoggedIn = true;
        };

        self.impersonateUser = function(userID) {
            if(s_svc.systemUser.role == 'sadmin'){
                $http.post(url).success(function(answer){
                    console.log('The server replied: ' + answer);
                    s_svc.activeUser = answer.data;
                });
            }
        };

        self.logout = function() {
            $http.post(url).success(function(answer){
                console.log('The server replied: ' + answer);
                s_svc.logout();
            });
        };
    }]);

})();