angular.module('starter.services', [])
        // Doc firebase: https://www.firebase.com/docs/web/libraries/angular/api.html
        .factory('UserService', function ($firebaseAuth, $q) {
            var auth = $firebaseAuth();
            return {
                registerUser: function (username, password) {
                    var q = $q.defer();

                    auth.$createUserWithEmailAndPassword(username, password).then(function () {
                        q.resolve();
                    }).catch(function (err) {
                        q.reject(err);
                    });

                    return q.promise;
                },
                loginUser: function (username, password) {
                    var q = $q.defer();

                    auth.$signInWithEmailAndPassword(username, password).then(function () {
                        q.resolve();
                    }).catch(function (err) {
                        q.reject(err);
                    });

                    return q.promise;
                },
                getUser: function () {
                    return auth.$getAuth();
                }
            };
        })

        .service('DataService', function ($firebaseObject, $firebaseArray, $q) {
            return {
                createPlaylist: function (userId, name, description) {
                    var q = $q.defer();

                    var firebaseRef = firebase.database().ref();
                    firebaseRef.child('playlist').child(userId).push({
                        name: name,
                        description: description
                    }).then(function (res) {
                        q.resolve(res);
                    }).catch(function (err) {
                        q.reject(err);
                    });

                    return q.promise;
                },
                getPlaylist: function (userId) {
                    var q = $q.defer();

                    var firebaseRef = firebase.database().ref();
                    var playlist = $firebaseArray(firebaseRef.child('playlist').child(userId));
                    playlist.$loaded().then(function (list) {
                        q.resolve(list);
                    }).catch(function (err) {
                        q.reject(err);
                    });

                    return q.promise;
                }
            };
        });
