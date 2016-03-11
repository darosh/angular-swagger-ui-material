var RUNS = 100;
var HUB = 'http://localhost:8888/angular-swagger-ui-material/demo/hub/';

describe('all links on hub page', function () {
    it('should load', function () {
        browser.driver.manage().window().maximize();

        // Open hub
        browser.get(HUB);

        // Count specs
        var list = element.all(by.repeater('api in vm.apis track by ::api.key'));
        expect(list.count()).toBeGreaterThan(RUNS - 1);

        for (var i = 0; i < RUNS; i++) {
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

            // Click first operations
            element.all(by.css('button.sum-http-method')).get(0).click();

            // Pin sidenav locked open
            element(by.buttonText('chevron_left')).click();

            // Open HTTO method info dialog
            element.all(by.css('md-sidenav button.sum-http-method')).get(0).click();

            // Close dialog
            element(by.css('md-dialog button')).click();

            // Go back to hub
            browser.navigate().back();
        }
    }, 1000 * 60 * 60);
});
