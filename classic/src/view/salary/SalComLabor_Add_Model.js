Ext.define('GSmartApp.view.salary.SalComLabor_Add_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalComLabor_Add_Model',
    stores: {
        LaborLevelStore: {
            type: 'LaborStore'
        }
    },
    data: {
        orgid_link: null,
        salcomid_link: null,
    }
})