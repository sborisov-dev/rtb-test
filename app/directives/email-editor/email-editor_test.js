/*!
 * Created by Sergey Borisov on 25.08.2016.
 */
'use strict';

describe('emailEditor', function ()
{

    beforeEach(module('viApp'));

    describe('EmailEditorController', function ()
    {

        it('should create a `emails` model with 1 item', inject(function ($controller)
        {
            var scope = {};
            var ctrl = $controller('viAppController', {$scope: scope});

            expect(scope.emails.length).toBe(1);
        }));

    });

});