/**
 * Created by luis on 11/8/14.
 */
var appUser = {username: 'luis', password: 'password', loggedIn: false};
var app = angular.module('baseApp',[]);
app.controller('LoginController', function(){
    this.user = appUser;
});