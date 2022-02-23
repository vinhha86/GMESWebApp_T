Ext.define('GSmartApp.store.demo.Stockin_demo_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.Stockin_demo_Store',
    storeId: 'Stockin_demo_Store',
    fields: [
        { name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'quantity', type: 'int' }
    ],
    sorters: {
        direction: 'ASC',
        property: 'code'
    },
    loadPackingList: function () {
        var params = new Object();
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/getpackinglist',
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
    },
    LoadPickingList: function (storeid) {
        var params = new Object();
        params.store_id = storeid;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/listitempicking ',
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
