Ext.define('GSmartApp.store.invoice.invoice_packinglist_store', {
    extend: 'Ext.data.Store',
    storeId: 'invoice_packinglist_store',
    alias: 'store.invoice_packinglist_store',
    model: 'GSmartApp.model.invoice.invoice_packinglist',
    loadStore_bylotnumber: function(invoicedid_link, lotnumber){
        var params = new Object();
            params.invoicedid_link = invoicedid_link;
            params.lotnumber = lotnumber;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getpkl_bylotnumber',
                paramsAsJson:true,
                extraParams : params,
                noCache: false,
                headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json"
                 },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            });
            this.loadPage(1,{
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                         // this.fireEvent('logout');
                    }
                }
            });
    }
});
