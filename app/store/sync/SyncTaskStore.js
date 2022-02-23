Ext.define('GSmartApp.store.sync.SyncTaskStore', {
    extend: 'Ext.data.Store',
    storeId: 'SyncTaskStore',
    alias: 'store.SyncTaskStore',
    fields: [
        'id',
        'name',
        'type',
        {
            name: 'date_created', type: 'date', format: 'c'
        },
        {
            name: 'time_finish', type: 'date', format: 'c'
        },
        'jobid',
        'status',
        'src',
        'des',
        {
            name: 'last_updated', type: 'date'
        },
        {
            name: 'status_name',
            calculate: function (data) {
                if (data.status == 0) {
                    return "Đang chạy"
                }
                else if (data.status == 1) {
                    return "Đã kết thúc";
                }
                else if (data.status == -1) {
                    return "Có lỗi";
                }
            }
        },
        {
            name: 'type_name',
            calculate: function (data) {
                if (data.type == 0) {
                    return "Thủ công"
                }
                else if (data.status == 1) {
                    return "Định kỳ";
                }
            }
        }
    ],
    sorters: [{
        property: 'date_created',
        direction: 'DESC'
    }, {
        property: 'status',
        direction: 'ASC'
    }],
    loadStore: function () {
        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getlist_task',
            actionMethods: {
                read: 'POST'
            },
            // extraParams: params,
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    }
});