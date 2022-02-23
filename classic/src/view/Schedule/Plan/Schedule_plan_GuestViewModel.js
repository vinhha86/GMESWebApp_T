Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_GuestViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Schedule_plan_GuestViewModel',
    data: {
        schedule: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14'
        },
        isHidden_KHGH: true,
        isHidden_CMP: true,
        isHidden_Salary: true
    }
})