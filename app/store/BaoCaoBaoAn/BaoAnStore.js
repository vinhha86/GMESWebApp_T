Ext.define('GSmartApp.store.BaoCaoBaoAn.BaoAnStore', {
    extend: 'Ext.data.Store',
    storeId: 'BaoAnStore',
    alias: 'store.BaoAnStore',
    fields: [
        'org_name', 'orgtypeid_link',
        {
            name: 'ca1', type: 'int'
        },
        {
            name: 'ca2', type: 'int'
        },
        {
            name: 'ca3', type: 'int'
        },
        {
            name: 'ca4', type: 'int'
        }
    ],
    sorters: [
        {
            property: 'orgtypeid_link',
            direction: 'DESC'
        }
    ],
    loadStore: function (orgid_link, date_from, date_to) {
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date_from = date_from;
        params.date_to = date_to;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/timesheetlunch/tonghopbaoan',
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

        this.load({
            scope: this,
            callback: function (records, operation, success) {
                if (success) {
                    this.fireEvent('LoadTongHopBaoAnSuccess');
                }
            }
        });
    }
});
