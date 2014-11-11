/**
 * Created by luis on 11/10/2014.
 */
(function () {
    var app = angular.module('LoginService', []);

    app.service('LoginService', ['$http', function($http){
        // URL for backend services.
        var url = 'rest/loginServices';
        // Good practices
        var self = this;
        // Stores user session information.
        self.user = {};
        // Is the user logged into the system.
        self.loggedIn = false;
        // Temporary storage of user's credentials before check.
        self.credentials = {};

        self.checkCredentials = function() {
            $http.post(url).success(function(answer){
                console.log('The server replied: ' + answer);
            });
        };
    }]);

})();