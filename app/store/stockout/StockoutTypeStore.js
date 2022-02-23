Ext.define('GSmartApp.store.stockout.StockoutTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockoutTypeStore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	loadStore:function(typeFrom, typeTo){
        var me = this;
        var param=new Object();
        param.typeFrom = typeFrom;
        param.typeTo = typeTo;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },          
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout/gettype',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			},
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
                rootProperty: 'data'
            }
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
    },    
});
