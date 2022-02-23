Ext.define('GSmartApp.view.salary.SalComPosition_Add_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalComPosition_Add_Model',
    stores: {
        PositionStore: {
            type: 'PositionStore'
        }
    },
    data: {
        orgid_link: null,
        salcomid_link: null,
    }
})