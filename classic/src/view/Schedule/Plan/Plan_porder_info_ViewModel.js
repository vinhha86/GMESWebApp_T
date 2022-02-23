Ext.define('GSmartApp.view.Schedule.Plan.Plan_porder_info_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Plan_porder_info_ViewModel',
    data: {        
        sch: {
            startDate: '',
            endDate: '',
            duration: 0,
            productivity: 0,
        },
        oldValue: {
            startDate: '',
            endDate: '',
            duration: 0,
            productivity: 0,
        }
    }
})