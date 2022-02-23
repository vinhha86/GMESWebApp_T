Ext.define('GSmartApp.store.pcontract.PContractChartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PContractChartStore',
    fields: ['mahang', 'soluong'],
    loadStoreByType: function (type, year) {
        var url = '/api/v1/pcontract/getpcontractchart';

        var params = new Object();
        params.year = year;
        params.type = type;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + url,
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
