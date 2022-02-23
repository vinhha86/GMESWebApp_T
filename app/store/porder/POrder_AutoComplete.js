Ext.define('GSmartApp.store.POrder_AutoComplete', {
    extend: 'Ext.data.Store',
    storeId: 'POrder_AutoComplete',
    alias: 'store.POrder_AutoComplete',

    fields: [
        'id',
        'ordercode',
        'granttoorgid_link'
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
        url: config.getAppBaseUrl()+'/api/v1/porderlist/getPorderByOrdercodeAndOrg',
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
