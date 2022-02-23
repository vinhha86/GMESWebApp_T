Ext.define('GSmartApp.store.cutplan.LoaiPhoiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.LoaiPhoiStore',
    fields: [
        { name: 'name', type: 'string' }
    ],
    loadStore: function (pcontractid_link, productid_link, material_skuid_link) {
        var me = this;
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;
        params.material_skuid_link = material_skuid_link;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/cutplan/getall_loaiphoimau',
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
        this.load({
            callback: function (records, operation, success) {
                if (success)
                    this.fireEvent("LoadDone", records.length > 0 ? records[0] : null);
            }
        });
    }
});
