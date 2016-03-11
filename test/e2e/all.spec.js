var HUB = 'http://localhost:8888/angular-swagger-ui-material/demo/hub/';

describe('all links on hub page', function () {
    it('should load', function () {
        browser.driver.manage().window().maximize();

        // Open hub
        browser.get(HUB);

        // Sort by last updated
        var el = element(by.css('md-menu'));
        browser.driver.wait(protractor.until.elementIsVisible(el));
        el.click();
        element(by.buttonText('Last updated')).click();

        // Count specs
        var list = element.all(by.repeater('api in vm.apis track by ::api.key'));
        var count = list.count();
        expect(count).toBeGreaterThan(0);

        count.then(function (count) {
            for (var i = 0; i < count; i++) {
                // Open ui
                list.get(i).element(by.css('md-toolbar')).click();

                // Count groups
                var apis = element.all(by.repeater('api in resources track by $index'));
                expect(apis.count()).toBeGreaterThan(0);

                // Click title edit
                element(by.binding('displayTitle')).click();

                // Click search edit
                element(by.buttonText('search')).click();

                // Close search edit
                element(by.buttonText('close')).click();

                // Click expland all
                element.all(by.buttonText('keyboard_arrow_down')).get(0).click();

                // Click collapse all
                element.all(by.buttonText('keyboard_arrow_up')).get(0).click();

                // Click switch view
                element(by.buttonText('view_comfy')).click();

                // Click show description
                element(by.buttonText('speaker_notes')).click();

                // Open proxy dialog
                element(by.buttonText('security')).click();

                // Close proxy dialog
                element(by.css('md-dialog button')).click();

                element.all(by.buttonText('vpn_key')).count().then(function (count) {
                    if (count) {
                        // Open security dialog
                        element(by.buttonText('vpn_key')).click();

                        // Close security dialog
                        element(by.css('md-dialog button')).click();
                    }

                    // Click first operations
                    element.all(by.css('button.sum-http-method')).get(0).click();

                    // Pin sidenav locked open
                    element(by.buttonText('chevron_left')).click();

                    // Scripts tab
                    element.all(by.css('md-tab-item')).get(1).click();

                    // Open HTTP method info dialog
                    element.all(by.css('md-sidenav button.sum-http-method')).get(0).click();

                    // Close dialog
                    element(by.css('md-dialog button')).click();

                    // Go back to hub
                    browser.navigate().back();
                });
            }
        });
    }, 1000 * 60 * 60);
});
