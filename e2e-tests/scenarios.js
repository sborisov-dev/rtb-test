/*!
 * Created by Sergey Borisov on 25.08.2016.
 */

describe('viApp', function ()
{
    beforeEach(function ()
    {
        browser.get('/');
    });

    it('should display one email block', function ()
    {
        var emailBlock = element.all(by.css('span.EE_item'));

        expect(emailBlock.count()).toEqual(1);
    });

    it('should display first email block as valid', function ()
    {
        var emailBlock = element(by.css('span.EE_item'));

        expect(emailBlock.getAttribute('class')).toEqual("EE_item ng-scope");
    });

    it('should remove email block', function ()
    {
        var icon = element(by.css('span.EE_item span.EEI_icon-cross'));
        icon.click();

        var emailBlock = element.all(by.css('span.EE_item'));
        expect(emailBlock.count()).toEqual(0);
    });

});
