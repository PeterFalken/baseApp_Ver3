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
                // Good practices.
                var self = this;
                // Start with an empty array.
                self.directoryLetters = [];

                $http.get('rest/Directory').success(function (letters) {
                    self.directoryLetters - letters;
                });
            },
            controllerAs: 'directoryCtrl'
        };
    });
})();