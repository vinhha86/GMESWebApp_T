Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimesheetShiftTypeViewModel',
    requires: [
        'GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore',
    ],
    stores: {
        TimesheetShiftTypeStore: {
            type: 'TimesheetShiftTypeStore'
        },
    },
    data: {
        shift: {
            id: null,
            name: null,
            code: null,
            is_ca_an: null,
        }
    }
})