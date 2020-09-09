/*!
 * Created by Sergey Borisov on 24.08.2016.
 */

angular
    .module("viApp")
    .directive("emailEditor", function ()
    {
        return {
            restrict: "E",
            scope: {
                emails: "=",
                rawText: "@",
                watermark: "@",
                changed: "&onEmailsUpdated"
            },
            templateUrl: "directives/email-editor/email-editor.html",
            link: function (scope, element)
            {
                // бросаем фокус на поле ввода, если кликнули по области ввода email
                var input = element.find("textarea")[0],
                    wrapper = element.find("div");

                wrapper.on("click", function clickHandler()
                {
                    if (!input) return;

                    if (input.scrollIntoView)
                        input.scrollIntoView(false);
                    if (input && input.focus)
                        input.focus();
                });

                element.on('$destroy', function ()
                {
                    wrapper.off("click", clickHandler)
                });
            },
            controller: [
                "$timeout", "$scope", function ($timeout, $scope)
                {
                    var self = this,
                        KEYS = {
                            Comma: 188,
                            Enter: 13
                        },
                        DELIMETERS = [",", ";", " "];

                    $scope.rawText = "";

                    $scope.handleKeyDown = function ($event)
                    {
                        if ($event.keyCode === KEYS.Comma || $event.keyCode === KEYS.Enter)
                        {
                            self.parseEmails($scope.rawText);
                            self.clearRawText();
                            $event.stopPropagation();
                            $event.preventDefault();
                            return false;
                        }
                    };

                    $scope.handleKeyUp = function ($event)
                    {
                        if ($event.keyCode === KEYS.Comma || $event.keyCode === KEYS.Enter)
                        {
                            $event.stopPropagation();
                            $event.preventDefault();
                            return false;
                        }
                    };

                    $scope.handlePaste = function ()
                    {
                        $timeout($scope.processRawText, 100, $scope);
                    };

                    $scope.processRawText = function ()
                    {
                        self.parseEmails($scope.rawText);
                        self.clearRawText();
                    };

                    $scope.remove = function (email)
                    {
                        self.removeEmail(email);
                    };
                    //endregion

                    self.addEmail = function (email)
                    {
                        if (email && !self.hasEmail(email))
                        {
                            $scope.emails.push(email);
                            self.fireEvent();
                        }
                    };

                    self.fireEvent = function ()
                    {
                        if ($scope.changed)
                            $scope.changed();
                    };

                    self.removeEmail = function (email)
                    {
                        var index = $scope.emails.indexOf(email);
                        if (index > -1)
                        {
                            $scope.emails.splice(index, 1);
                            self.fireEvent();
                        }
                    };

                    self.hasEmail = function (email)
                    {
                        return $scope.emails.some(function (x)
                        {
                            return x.toLowerCase() === email.toLowerCase()
                        });
                    };

                    self.parseEmails = function (rawText)
                    {
                        var its = self.split(rawText);

                        its.forEach(function (x)
                        {
                            self.addEmail(x);
                        });
                    };

                    self.clearRawText = function ()
                    {
                        $scope.rawText = "";
                    };

                    //region utils
                    self.split = function (text)
                    {
                        if (!text)
                            return [];

                        var result = [],
                            term = "";

                        for (var i = 0, l = text.length; i < l; i++)
                        {
                            var char = text[i];
                            if (DELIMETERS.indexOf(char) > -1)
                            {
                                result.push(term);
                                term = "";
                            }
                            else
                            {
                                term += char;
                            }
                        }
                        if (term)
                            result.push(term);
                        return result;
                    };

                    self.generateRandomEmail = function ()
                    {
                        var hosts = ["gmail.com", "mail.ru", "yandex.ru", "outlook.com", "test.org"],
                            username = self.randomString(Math.floor(Math.random() * 15) || 7),
                            host = hosts[Math.floor(Math.random() * 5)];

                        return username + "@" + host;
                    };

                    self.randomString = function (len, items)
                    {
                        var chars = items || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                            result = '';

                        for (var i = 0; i < len; i++)
                        {
                            var index = Math.floor(Math.random() * chars.length);
                            result += chars.substring(index, index + 1);
                        }
                        return result;
                    };
                    //endregion
                }
            ]
        }
    });
