Ext.define('GSmartApp.store.Sku_AutoComplete', {
    extend: 'Ext.data.Store',
    storeId: 'Sku_AutoComplete',
    alias: 'store.Sku_AutoComplete',

    fields: [
        'id',
        'orgrootid_link',
        'code',
        'partnercode',
        'barcode',
        'skutypeid_link',
        'name',
        'name_en',
        'categoryid_link',
        'bossid_link',
        'providerid_link',
        'fabricid_link',
        'packingtype',
        'unitid_link',
        'imgurl1',
        'imgurl2',
        'imgurl3',
        'hscode',
        'hsname',
        'saleprice',
        'discountpercent',
        'vatpercent',
        'productid_link',
        {
            name: 'skuCode_color',
            convert : function (value, rec) {
                var result = '';
                if(rec.get('code') != null){
                    result += rec.get('code');
                    if(rec.get('color_name') != null){
                        result += ' - ' + rec.get('color_name');
                    }
                }
            	return result;
            }
        },
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
        url: config.getAppBaseUrl()+'/api/v1/sku/getSkuByCode',
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
