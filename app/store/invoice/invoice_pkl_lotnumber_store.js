Ext.define('GSmartApp.store.invoice.invoice_pkl_lotnumber_store', {
    extend: 'Ext.data.Store',
    storeId: 'invoice_pkl_lotnumber_store',
    alias: 'store.invoice_pkl_lotnumber_store',
    model: 'GSmartApp.model.invoice.invoice_model',
    loadStore: function(invoicedid_link){
            var params = new Object();
            params.invoicedid_link = invoicedid_link;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlotnumber',
                paramsAsJson:true,
                extraParams : params,
                noCache: false,
                headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json"
                 },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
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
