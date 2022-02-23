Ext.define('GSmartApp.view.pcontract.Report_CMP_ToSX_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Report_CMP_ToSX_ViewModel',
    stores: {
        CMPReportStore: {
            type: 'CMPStore'
        }     
    },
    data:{
        ord_code: null,
        cmpoption: null
    }
})