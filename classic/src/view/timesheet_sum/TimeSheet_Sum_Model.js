Ext.define('GSmartApp.view.salary.TimeSheet_Sum_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheet_Sum_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        TimeSheetSumStore:{
            type: 'TimeSheetSumStore'
        }                
    },
    data: {
        selected_tab: null,
        selected_orgid: null,
        year: null,
        month: null
    }
})