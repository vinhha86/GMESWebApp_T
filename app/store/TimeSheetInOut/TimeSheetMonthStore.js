Ext.define('GSmartApp.store.TimeSheetInOut.TimeSheetMonthStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TimeSheetMonthStore',
    fields: [
        { name: 'id' },
        { name: 'personnel_code', type: 'string' },
        { name: 'time_working', type: 'number' },
        { name: 'time_plus', type: 'number' },
        { name: 'time_over', type: 'number' },
        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },

        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'time_sunday', type: 'number' },
        { name: 'lunch', type: 'number' },
        { name: 'total', type: 'number' },
        'month', 'year', {
            name: 'ngayvao_congty', type: 'date'
        }, 'fullname'
    ],
    sorters: [{
        property: 'personnel_code',
        direction: 'ASC'
    }],
    loadStore: function (month, year, orgid_link, grantid_link) {
        grantid_link = grantid_link == null ? 0 : grantid_link;
        var params = new Object();
        params.month = month;
        params.year = year;
        params.orgid_link = orgid_link;
        params.grantid_link = grantid_link;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/timesheetinout/get_timesheet_month',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load({
            callback: function (records, operation, success) {
                this.fireEvent('loadStore_done');
            }
        });
    }
});
