Ext.define('GSmartApp.view.pprocess.Productivity_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Productivity_Model',
    requires: [
        'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.porder.PorderSewingCostStore'
    ],
    stores: {
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        PorderSewingCostStore: {
            type: 'PorderSewingCostStore'
        },
    },
    data: {
        record: null, 
        date: null,
        shifttypeid_link: null,
        personnelid_link: null
    }
})