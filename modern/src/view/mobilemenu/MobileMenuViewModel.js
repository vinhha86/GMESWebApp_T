Ext.define('GSmartApp.view.mobilemenu.MobileMenuViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MobileMenuViewModel',
    requires: [
        'GSmartApp.store.MobileMenu'
    ],
    stores: {
        MobileMenu: {
            type: 'MobileMenu'
        },
    },

    data: {
        
    }
})