Ext.define('GSmartApp.store.demo.device_demo_store', {
    extend: 'Ext.data.Store',
    alias: 'store.device_demo_store',
    storeId: 'device_demo_store',
    fields: [
        { name: 'deviceid', type: 'string' },
        { name: 'devicename', type: 'string' },
        { name: 'devicetype', type: 'int' },
        { name: 'state', type: 'int' }
    ],
    sorters: {
        direction: 'ASC',
        property: 'codename'
    },
    loadStore: function () {
        var params = new Object();
        params.devtype_id = 0;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/listdevice',
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            extraParams: params,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    }
});
