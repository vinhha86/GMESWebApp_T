Ext.define('GSmartApp.view.Schedule.Plan.ScheduleItemInfo.ScheduleItemInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ScheduleItemInfoViewModel',
    requires: [

    ],
    stores: {
    },
    data: {
        eventRecord: null,
        record: null, // eventRecord.data
        pcontract_po: null, // po ke hoach
        shipdate: null, // shipdate cua pcontract_po
    }
})