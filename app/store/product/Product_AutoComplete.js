Ext.define('GSmartApp.store.Product_AutoComplete', {
    extend: 'Ext.data.Store',
    storeId: 'Product_AutoComplete',
    alias: 'store.Product_AutoComplete',

    fields: [
        'id',
        'buyercode',
        'producttypeid_link'
    ],
    // autoLoad: true,
    proxy: {
        type: 'ajax',
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        limitParam: false, //to remove param "limit"            
        cors: true,
        url: config.getAppBaseUrl()+'/api/v1/product/getByBuyerCodeAndType',
        paramsAsJson:true,
        noCache: false,
        headers :{
            'Accept': "application/json", 
            'Content-Type':"application/json"
         },
        useDefaultXhrHeader: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        success : function(response,options ) {
            // var response = Ext.decode(response.responseText);
            console.log(response);
        },
        failure :function(response,options){
            console.log(response);
        }
    }
});
