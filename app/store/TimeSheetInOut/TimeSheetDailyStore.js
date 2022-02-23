Ext.define('GSmartApp.store.TimeSheetInOut.TimeSheetDailyStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TimeSheetDailyStore',
    fields: [
        { name: 'id' },
        { name: 'personnel_code', type: 'string' },
        'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10',
        'day11', 'day12', 'day13', 'day14', 'day15', 'day16', 'day17', 'day18', 'day19', 'day20',
        'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30',
        'day31', 'sortvalue', 'stt'
    ],
    sorters: [{
        property: 'personnel_code',
        direction: 'ASC'
    }, {
        property: 'sortvalue',
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
            url: config.getAppBaseUrl() + '/api/v1/timesheetinout/get_daily',
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
