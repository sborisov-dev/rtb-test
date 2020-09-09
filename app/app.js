'use strict';

angular
    .module("viApp", [])
    .controller("viAppController", [
        "$window", "$scope", function ($window, $scope)
        {
            $scope.emails = ["sidorov@mail.ru"];

            $scope.addEmails = function ()
            {
                var randomEmail = generateRandomEmail();
                $scope.emails.push(randomEmail);
            };

            $scope.getEmailsCount = function ()
            {
                $window.alert($scope.emails.length);
            };
            $scope.onEmailsUpdated = angular.noop();

            function generateRandomEmail()
            {
                var hosts = ["gmail.com", "mail.ru", "yandex.ru", "outlook.com", "test.org"],
                    username = randomString(Math.floor(Math.random() * 15) || 7),
                    host = hosts[Math.floor(Math.random() * 5)];

                return username + "@" + host;
            }

            function randomString(len, items)
            {
                var chars = items || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    result = '';

                for (var i = 0; i < len; i++)
                {
                    var index = Math.floor(Math.random() * chars.length);
                    result += chars.substring(index, index + 1);
                }
                return result;
            }
        }
    ]);
