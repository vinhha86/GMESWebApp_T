Ext.define('GSmartApp.store.demo.StoreType', {
    extend: 'Ext.data.Store',
    alias: 'store.StoreType',
    storeId: 'StoreType',
    fields: [
        { name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'en_name', type: 'bool' },
        { name: 'en_code', type: 'bool' },
        { name: 'en_lot', type: 'bool' },
        { name: 'en_exp', type: 'bool' },
        { name: 'en_qty', type: 'bool' }
    ],
    sorters: {
        direction: 'ASC',
        property: 'name'
    },
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
            url: config.getAppBaseUrl_demo() + 'demorfid/getstoretype',
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
