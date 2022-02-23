Ext.define('GSmartApp.store.demo.inv_store', {
    extend: 'Ext.data.Store',
    alias: 'store.inv_store',
    storeId: 'inv_store',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'codename', type: 'string' },
        { name: 'storename', type: 'string' },
        { name: 'storetype_id', type: 'int' },
        'state',
        'created_on',
        'storetype_name'
    ],
    sorters: {
        direction: 'ASC',
        property: 'codename'
    },
    groupField: 'storetype_name',
    loadStore: function () {
        var params = new Object();
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/listinv',
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
