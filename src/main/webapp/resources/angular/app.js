/**
 * Created by luis on 11/8/14.
 */
(function () {
    var app = angular.module('baseApp', ['SystemLogin','SessionModule']);

    app.controller('MainController', ['SessionService', function (s_svc) {
        // Good practices.
        var self = this;

        self.isLoggedIn = function(){
            return s_svc.isLoggedIn;
        };

        self.logout = function() {
          s_svc.logout();
        };
    }]);

})();