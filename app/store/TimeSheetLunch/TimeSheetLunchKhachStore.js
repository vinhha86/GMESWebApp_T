Ext.define('GSmartApp.store.TimeSheetLunch.TimeSheetLunchKhachStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TimeSheetLunchKhachStore',
    storeId: 'TimeSheetLunchKhachStore',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'orgid_link', type: 'int' },
        { name: 'shifttypeid_link', type: 'int' },
        'shifttype_name',
        { name: 'status', type: 'int' },
        { name: 'amount', type: 'int' }, 'orgtypeid_link'
    ],
    sorters: [{
        property: 'orgtypeid_link',
        direction: 'DESC'
    }, {
        property: 'shifttype_name',
        direction: 'ASC'
    }],
    loadStore: function (orgid_link, date) {
        var params = new Object();
        params.orgid_link = orgid_link;
        params.ngay = date;
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/timesheetlunch_khach/getby_date',
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
        this.load();
    }
});
