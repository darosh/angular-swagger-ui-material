var HUB = 'http://localhost:8888/angular-swagger-ui-material/demo/hub/';

module.exports = function Hub () {
    var menu = element(by.css('md-menu'));
    var menuLastUpdate = element(by.buttonText('Last updated'));
    var list = element.all(by.repeater('api in vm.apis track by ::api.key'));
    var exampleNotGoogle = element(by.linkText('!google'));

    this.get = function () {
        browser.get(HUB);
        browser.driver.wait(protractor.until.elementIsVisible(menu));
    };

    this.sortByLastUpdate = function () {
        menu.click();
        menuLastUpdate.click();
    };

    this.exampleNotGoogle = function () {
        exampleNotGoogle.click();
    };

    this.list = list;

    this.listCount = function () {
        return list.count();
    };

    this.listItemToolbar = function (index) {
        return list.get(index).element(by.css('md-toolbar'));
    };
};
