describe('all links on hub page', function () {
    it('should load', function () {
        browser.driver.manage().window().maximize();

        browser.get('http://localhost:8888/angular-swagger-ui-material/demo/hub.html');

        var list = element.all(by.repeater('api in vm.apis track by $index'));
        expect(list.count()).toEqual(203);

        for (var i = 0; i < 203; i++) {
            list.get(i).element(by.css('a')).click();
            var apis = element.all(by.repeater('api in resources track by $index'));
            expect(apis.count()).toBeGreaterThan(0);

            element(by.binding('displayTitle')).click();
            element(by.buttonText('search')).click();
            element(by.buttonText('close')).click();

            element.all(by.buttonText('keyboard_arrow_down')).get(0).click();
            element.all(by.buttonText('keyboard_arrow_up')).get(0).click();
            element(by.buttonText('view_comfy')).click();
            element(by.buttonText('speaker_notes')).click();

            element(by.buttonText('security')).click();
            element(by.css('md-dialog button')).click();

            element.all(by.css('button.sum-http-method')).get(0).click();

            element(by.buttonText('chevron_left')).click();

            element.all(by.css('md-sidenav button.sum-http-method')).get(0).click();
            element(by.css('md-dialog button')).click();

            //element.all(by.css('md-tab-item')).get(1).click();

            browser.navigate().back();
        }
    }, 1000 * 60 * 60);
});
