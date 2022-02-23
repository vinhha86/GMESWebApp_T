Ext.define('GSmartApp.view.pcontract.Report_SalaryFund_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Report_SalaryFund_ViewModel',
    stores: {
        SalaryFundReportStore: {
            type: 'SalaryFundStore'
        }     
    }
})