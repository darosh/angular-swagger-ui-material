var UI = 'http://localhost:8888/angular-swagger-ui-material/demo/';

module.exports = function Ui () {
    this.menu = element(by.css('md-menu'));
    this.apis = element.all(by.repeater('api in resources track by $index'));
    this.displayTitle = element(by.binding('displayTitle'));
    this.search = element(by.buttonText('search'));
    this.closeSearch = element(by.buttonText('close'));
    this.expand = element.all(by.buttonText('keyboard_arrow_down')).get(0);
    this.collapse = element.all(by.buttonText('keyboard_arrow_up')).get(0);
    this.view = element(by.buttonText('view_comfy'));
    this.description = element(by.buttonText('speaker_notes'));
    this.proxy = element(by.buttonText('security'));
    this.closeDialog = element(by.css('md-dialog-actions button[ng-click="closeDialog()"]'));
    this.security = element.all(by.buttonText('vpn_key'));
    this.operations = element.all(by.css('button.sum-http-method'));
    this.pin = element(by.buttonText('chevron_left'));
    this.tab = element.all(by.css('md-tab-item'));
    this.method = element.all(by.css('md-sidenav button.sum-http-method')).get(0);
    this.play = element.all(by.css('.md-fab:not([disabled])'));
    this.status = element.all(by.css('.sum-http-code:not([disabled])'));
    this.searchInput = element(by.css('toolbar-search input'));
    this.resultStatus = element.all(by.css('#tab-content-2 button.sum-http-code:not([disabled])'));
    this.resultHeader = element.all(by.css('#tab-content-2 button.sum-http-header:not([disabled])'));
    this.model = element.all(by.binding('vm.sop.responseClass.display ? \'Model\' : \'Example\''));
    this.set = element.all(by.linkText('Set'));
    this.dialogTabs = element.all(by.css('md-dialog md-tab-item'));

    this.get = function () {
        browser.get(UI);
    };

    this.waitForResult = function() {
        browser.driver.wait(protractor.until.elementIsVisible(element(by.css('#tab-content-2'))));
    };

    this.waitForScripts = function() {
        browser.driver.wait(protractor.until.elementIsVisible(element(by.css('#tab-content-1'))));
    };
};
