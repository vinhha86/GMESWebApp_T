Ext.define('GSmartApp.view.documentguide.Document_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Document_ViewModel',
    requires: ['GSmartApp.store.documentguide.DocumentGuideStore'],
    stores: {
        DocumentGuideStore : {
            type: 'DocumentGuideStore'
        }
    },
    doctype: 0
})