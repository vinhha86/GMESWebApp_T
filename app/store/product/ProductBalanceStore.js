Ext.define('GSmartApp.store.product.ProductBalanceStore', {
    extend: 'Ext.data.Store',
    storeId: 'ProductBalanceStore',
	alias: 'store.ProductBalanceStore',
	// groupField: 'granttoorgname',
    // pageSize: 25,
    fields: [
		{name: 'id', type: 'int'},
		{name: 'balance_name', type: 'string'},
        {name: 'sortvalue', type: 'int'},
	],
	loadStore: function(productid_link){
        var params = new Object();
        params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/product_balance/getByProduct',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
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
	},
});
