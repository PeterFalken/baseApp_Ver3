/**
 * Created by luis on 11/8/14.
 */
(function () {
    var app = angular.module('baseApp', ['SystemLogin','UserDirectory']);
    // var userSession = {};
    // var loggedIn = false;

    /*
    app.controller('AppUserDirectoryController', ['$http', function ($http) {
        // Good practices.
        var self = this;
        // Set base URL.
        self.baseURL = 'rest/Directory/';
        // Start with an empty array.
        self.directoryLetters = [];

        $http.get(self.baseURL).success(function(letters){
            self.directoryLetters - letters;
        });

        self.getUsersForLetter = function(letter){
            return $http.get(self.baseURL + letter );
        };

    }]);
    */
})();