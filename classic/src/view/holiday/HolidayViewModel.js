Ext.define('GSmartApp.view.holiday.HolidayViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HolidayViewModel',
    requires: [
        'GSmartApp.store.holiday.HolidayStore',
        'GSmartApp.store.holiday.HolidayYearStore'
    ],
    stores: {
        HolidayStore: {
            type: 'HolidayStore'
        },
        HolidayYearStore: {
            type: 'HolidayYearStore'
        }
    }
})