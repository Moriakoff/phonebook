var app = angular.module('myApp', ["ngRoute"]);

var token = null;


app.config($routeProvider,function ($routeProvider) {
        $routeProvider
          /*  .when("/", {
                templateUrl : "index.html"
            })*/
            .when("/login", {
                templateUrl : "loginPage.html",
                controller: "loginController"
            })
        /*.when("/registration", {
            templateUrl : "registrationPage.htm",
            controller: "registrationController"
        })*/;
    })
/*    .run(function ($rootScope,$location) {
        $rootScope.$on("$routeChangeStart",function (event,next,current) {

        })
    })

    app.controller("initiator", function ($scope) {
        angular.element(document).ready(function () {

        })
    });*/


app.controller('loginController', function ($scope, $http) {
    $scope.login = function () {

        let requestDto = {
            email: $scope.email,
            password: $scope.pwd
        };

        $http.post("http://localhost:8080/login", requestDto)
            .then(function (response) {
                token = response.data.token;
            }, function (response) {
                alert("Login or password incorrect")
            })
    }
});

app.controller('registrationCtr', function ($scope, $http) {

    $scope.registration = function () {

        if ($scope.pwdReg !== $scope.pwdMatches) {
            alert("Passwords don't same");
            return;
        }
        $http({
            method: 'POST',
            url: "http://localhost:8080/registration",
            data: {
                firstName: $scope.fNameReg,
                lastName: $scope.lNameReg,
                login: $scope.loginReg,
                email: $scope.emailReg,
                password: $scope.pwdReg,
            }
        }).then(function (response) {
            alert(response.data);
        })
    }

});

app.controller("phonebookController", function ($scope, $http) {

    window.onload =
        $http(
            {
                method: 'GET',
                url: "http://localhost:8080/contacts",
                headers: {
                    'Authorization': token
                }
            }
        ).then(function (response) {
            $scope.contacts = response.data;
        })
});




