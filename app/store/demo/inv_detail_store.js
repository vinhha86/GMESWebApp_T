Ext.define('GSmartApp.store.demo.inv_detail_store', {
    extend: 'Ext.data.Store',
    alias: 'store.inv_detail_store',
    storeId: 'inv_detail_store',
    fields: [
        'id',
        'store_id',
        'epc',
        'prodname',
        'prodcode',
        'lot',
        { name: 'expdate', type: 'date' },
        'status'
    ],
    sorters: [{
        direction: 'ASC',
        property: 'expdate'
    }, {
        direction: 'ASC',
        property: 'prodname'
    }],
    loadItemInStore: function (store_id) {
        var params = new Object();
        params.store_id = store_id;
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/getitems_in_store',
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
