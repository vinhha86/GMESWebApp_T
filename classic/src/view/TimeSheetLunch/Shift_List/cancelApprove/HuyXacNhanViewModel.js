Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.HuyXacNhanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HuyXacNhanViewModel',
    requires: [
        'GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore',
    ],
    stores: {
        TimesheetShiftTypeOrgStore: {
            type: 'TimesheetShiftTypeOrgStore'
        }
    },
    data: {
        record: {
            comment: '',
            shifttypeid_link: 0
        },
        orgid_link: 0,
        date: new Date()
    }
})