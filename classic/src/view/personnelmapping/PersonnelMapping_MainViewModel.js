Ext.define('GSmartApp.view.personnelmapping.PersonnelMapping_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PersonnelMapping_MainViewModel',
    requires: [
        'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.personnel.Personnel_Notmap_Store'
    ],
    stores: {
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        Personnel_Notmap_Store: {
            type: 'Personnel_Notmap_Store'
        },
    },
    data: {
    }
})