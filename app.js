/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the GSmartApp.Application class.
 */
Ext.application({
    name: 'GSmartApp',

    extend: 'GSmartApp.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all GSmartApp classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'GSmartApp.*'
    ],
    viewport: {
        autoMaximize: Ext.os.is.iOS && Ext.browser.is.webview
    },
});
