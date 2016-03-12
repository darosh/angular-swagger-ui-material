var hub = new (require('./lib/hub'))();
var ui = new (require('./lib/ui'))();

beforeEach(function () {
    browser.driver.manage().window().maximize();
    hub.get();
});

describe('all links on hub page', function () {
    it('should load and work', function () {
        // Filter non Google
        hub.exampleNotGoogle();

        // Sort by last updated
        hub.sortByLastUpdate();

        // Iterate links
        hub.listCount().then(function (count) {
            for (var i = 0; i < count; i++) {
                console.log('link #' + (i + 1));

                // Open ui
                hub.listItemToolbar(i).click();

                // Count groups
                // expect(ui.apis.count()).toBeGreaterThan(0);

                // Click title edit
                ui.displayTitle.click();

                // Click expand all
                ui.expand.click();

                // Click search edit
                ui.search.click();

                // Filter get methods
                ui.searchInput.sendKeys('get');
                browser.driver.sleep(750);

                // Open proxy dialog
                ui.proxy.click();

                // Close proxy dialog
                ui.closeDialog.click();

                ui.operations.count().then(function (countGetOperations) {
                    var firstOperationIsGet = countGetOperations > 1;

                    if (!firstOperationIsGet) {
                        // Close search edit
                        ui.closeSearch.click();
                        browser.driver.sleep(750);
                    }

                    // Click collapse all
                    ui.collapse.click();

                    // Click switch view
                    ui.view.click();

                    // Click show description
                    ui.description.click();

                    ui.security.count().then(function (count) {
                        if (count) {
                            // Open security dialog
                            ui.security.click();

                            ui.dialogTabs.count().then(function (count) {
                                for (var i = 1; i < count; i++) {
                                    ui.dialogTabs.get(i).click();
                                }
                            });

                            // Close security dialog
                            ui.closeDialog.click();
                        }

                        // Click first operations
                        ui.operations.first().click();

                        // Pin sidenav locked open
                        // TODO: layout bug inside sidenav + opened dialog
                        // ui.pin.click();

                        // Open HTTP method info dialog
                        ui.method.click();

                        // Close dialog
                        ui.closeDialog.click();

                        ui.model.count().then(function (count) {
                            for (var i = 0; i < count; i++) {
                                ui.model.get(i).click();
                            }
                        });

                        ui.set.count().then(function (count) {
                            for (var i = 0; i < count; i++) {
                                ui.set.get(i).click();
                            }
                        });

                        // Status codes
                        ui.status.count().then(function (count) {
                            for (var i = 0; i < count; i++) {
                                ui.status.get(i).click();
                                ui.closeDialog.click();
                            }
                        });

                        // Scripts tab
                        ui.tab.get(1).click();

                        if (firstOperationIsGet) {
                            ui.play.count().then(function (count) {
                                if (count) {
                                    // Submit
                                    ui.play.click();

                                    ui.waitForResult();

                                    ui.resultStatus.count().then(function (count) {
                                        if (count) {
                                            ui.resultStatus.first().click();
                                            ui.closeDialog.click();
                                        }
                                    });

                                    ui.resultHeader.count().then(function (count) {
                                        for (var i = 0; i < count; i++) {
                                            ui.resultHeader.get(i).click();
                                            ui.closeDialog.click();
                                        }
                                    });
                                }

                                // Go back to hub
                                browser.navigate().back();
                            });
                        } else {
                            ui.waitForScripts();

                            // Go back to hub
                            browser.navigate().back();
                        }
                    });
                });
            }
        });
    }, 1000 * 60 * 60);
});
