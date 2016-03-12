var hub = new (require('./lib/hub'))();

beforeEach(function () {
    console.log(browser);
    browser.driver.manage().window().maximize();
    hub.get();
});

describe('hub page', function () {
    it('should display list', function () {
        expect(hub.listCount()).toBeGreaterThan(0);
    });

    it('should filter list', function () {
        hub.exampleNotGoogle();
    });

    it('should sort list', function () {
        hub.sortByLastUpdate();
    });
});
