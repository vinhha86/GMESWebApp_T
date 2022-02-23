Ext.define('GSmartApp.store.device.device_group_store', {
    extend: 'Ext.data.Store',
	alias: 'store.device_group_store',
	model: 'GSmartApp.model.device.device_group_model',
   loadStore: function(){
    var me=this;
    this.setProxy({
        type: 'ajax',
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        url: config.getAppBaseUrl()+'/api/v1/devicegroup/getlist',
        paramsAsJson:true,
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
