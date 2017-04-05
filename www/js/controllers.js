angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $state, $timeout, UserService) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                UserService.loginUser($scope.loginData.username, $scope.loginData.password).then(function () {
                    console.log("logeado");
                    $scope.closeLogin();
                    $state.go('app.playlists');
                }).catch(function (error) {
                    if (error.code) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                        console.log(errorMessage);
                    } else {
                        // ...
                    }
                });
            };
        })

        .controller('SignupCtrl', function ($scope, $state, UserService) {
            $scope.signup = function (data) {
                console.log("Doing signup");

                UserService.registerUser(data.email, data.password).then(function () {
                    console.log("registrado");
                    $state.go('app.playlists');
                }).catch(function (error) {
                    if (error.code) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                        console.log(errorMessage);
                    } else {
                        // ...
                    }
                });
            };
        })

        .controller('PlaylistCreateCtrl', function ($scope, $state, DataService, UserService) {
            $scope.data = {};

            var user = UserService.getUser();

            $scope.createPlaylist = function () {
                DataService.createPlaylist(user.uid, $scope.data.name, $scope.data.description).then(function (res) {
                    console.log(res);

                    $state.go('app.playlists');
                });
            };

            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.data = {};
            });
        })

        .controller('PlaylistsCtrl', function ($scope, UserService, DataService) {
//            $scope.playlists = [
//                {title: 'Reggae', id: 1},
//                {title: 'Chill', id: 2},
//                {title: 'Dubstep', id: 3},
//                {title: 'Indie', id: 4},
//                {title: 'Rap', id: 5},
//                {title: 'Cowbell', id: 6}
//            ];
            $scope.playlists = [];

            var user = UserService.getUser();

            function loadPlaylist() {
                DataService.getPlaylist(user.uid).then(function (res) {
                    console.log(res);
                    $scope.playlists = res;
                });
            }

            $scope.$on("$ionicView.enter", function (event, data) {
                loadPlaylist();
            });
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams) {
        });
