Ext.define('GSmartApp.view.TimeSheetInOut.TongHopCong.CongThangViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CongThangViewModel',
    requires: ['GSmartApp.store.TimeSheetInOut.TimeSheetMonthStore', 'GSmartApp.store.org.ListOrgStore'],

    stores: {
        TimeSheetMonthStore: {
            type: 'TimeSheetMonthStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        GrantStore: {
            type: 'ListOrgStore'
        },
        YearStore: {
            data: [{
                id: (new Date().getFullYear()) - 1, name: (new Date().getFullYear()) - 1
            }, {
                id: (new Date().getFullYear()), name: (new Date().getFullYear())
            }, {
                id: (new Date().getFullYear()) + 1, name: (new Date().getFullYear()) + 1
            }]
        },
        MonthStore: {
            data: [{
                id: 1, name: 1
            }, {
                id: 2, name: 2
            }, {
                id: 3, name: 3
            }, {
                id: 4, name: 4
            }, {
                id: 5, name: 5
            }, {
                id: 6, name: 6
            }, {
                id: 7, name: 7
            }, {
                id: 8, name: 8
            }, {
                id: 9, name: 9
            }, {
                id: 10, name: 10
            }, {
                id: 11, name: 11
            }, {
                id: 12, name: 12
            }]
        }
    },
    data: {
        timesheetmonth: {
            year: new Date().getFullYear(),
            month: (new Date().getMonth()) + 1
        }
    }
})