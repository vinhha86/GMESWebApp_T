Ext.define('GSmartApp.store.invoice.Invoice_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Invoice_Store',
    alias: 'store.Invoice_Store',
    model: 'GSmartApp.model.invoice.invoice_model',
    pageSize: 1,
    loadStore_byPage: function(invoicenumber, custom_declaration, invoicedate_from, invoicedate_to, org_prodviderid_link,
        status, page, limit){
            var me=this;
            var params = new Object();
            params.invoicenumber = invoicenumber;
            params.custom_declaration = custom_declaration;
            params.invoicedate_from = invoicedate_from;
            params.invoicedate_to = invoicedate_to;
            params.org_prodviderid_link = org_prodviderid_link;
            params.status = status;

            me.pageSize = limit;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                // url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlist_bypage',
                url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getInvoice',
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
            this.loadPage(page,{
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                         // this.fireEvent('logout');
                    }
                }
            });
    },
    loadStore_byPage_async: function(invoicenumber, custom_declaration, invoicedate_from, invoicedate_to, org_prodviderid_link,
        status, page, limit){
            var me=this;
            var params = new Object();
            params.invoicenumber = invoicenumber;
            params.custom_declaration = custom_declaration;
            params.invoicedate_from = invoicedate_from;
            params.invoicedate_to = invoicedate_to;
            params.org_prodviderid_link = org_prodviderid_link;
            params.status = status;

            me.pageSize = limit;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                // url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlist_bypage',
                url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getInvoice',
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
    }
});
