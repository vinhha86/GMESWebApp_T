Ext.define('GSmartApp.view.salary.SalTypeLabor_Add_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalTypeLabor_Add_Model',
    stores: {
        LaborLevelStore: {
            type: 'LaborStore'
        }
    },
    data: {
        orgid_link: null,
        saltypeid_link: null,
    }
})