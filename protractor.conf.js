exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome'
    },
    jasmineNodeOpts: {
        showColors: true
    },
    suites: {
        hub: 'test/e2e/hub.spec.js',
        all: 'test/e2e/all.spec.js'
    }
};
