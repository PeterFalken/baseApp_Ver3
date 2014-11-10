/**
 * Created by luis on 11/9/14.
 */
(function () {
    var app = angular.module('UserDirectory', []);

    app.directive("userDirectory", function () {
        return {
            restrict: 'E',
            templateUrl: "resources/directives/user-directory.html",
            controller: function ($http) {
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
            },
            controllerAs: 'directoryCtrl'
        };
    });
})();