Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.Shift_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Shift_List_ViewModel',
    requires: [
        'GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore',
    ],
    stores: {
        TimesheetShiftTypeOrgStore: {
            type: 'TimesheetShiftTypeOrgStore'
        }
    },
    data: {
        orgid_link: null,
        date: null,
        action: null, // autoGetInfo || confirm
    }
})