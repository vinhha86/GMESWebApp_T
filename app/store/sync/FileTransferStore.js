Ext.define('GSmartApp.store.sync.FileTransferStore', {
    extend: 'Ext.data.Store',
    storeId: 'FileTransferStore',
    alias: 'store.FileTransferStore',
    fields: [
        'id',
        'name',
        {
            name: 'started_at', type: 'date', format: 'c'
        },
        {
            name: 'completed_at', type: 'date', format: 'c'
        },
        {
            name: 'percent',
            calculate: function (data) {
                if (data.percentage == null) {
                    if (data.completed_at == null || data.completed_at == "") {
                        return 0;
                    }
                    else {
                        return 1;
                    }
                }
                return data.percentage / 100;
            }
        },
        'percentage'
    ],
    sorters: [{
        property: 'date_created',
        direction: 'DESC'
    }, {
        property: 'status',
        direction: 'ASC'
    }],
    LoadFileByJob: function (jobid) {
        var params = new Object();
        params.jobid = jobid;

        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getlist_taskdetail',
            actionMethods: {
                read: 'POST'
            },
            extraParams: params,
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