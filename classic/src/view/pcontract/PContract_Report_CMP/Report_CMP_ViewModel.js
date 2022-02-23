Ext.define('GSmartApp.view.pcontract.Report_CMP_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Report_CMP_ViewModel',
    stores: {
        CMPReportStore: {
            type: 'CMPStore'
        }     
    }
})