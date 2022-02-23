Ext.define('GSmartApp.store.product.ProductSewingCostStore', {
    extend: 'Ext.data.Store',
    storeId: 'ProductSewingCostStore',
    alias: 'store.ProductSewingCostStore',

    model: 'GSmartApp.model.ProductSewingCost',
       
    sorters: [{
        property: 'workingprocess_name',
        direction: 'ASC'
    }],
    loadby_product: function(productid_link){
        var me=this;
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
			url: config.getAppBaseUrl()+'/api/v1/productsewingcost/getby_product',
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
		this.load();
	},
	loadByProductUnused: function(productid_link){
        var me=this;
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
			url: config.getAppBaseUrl()+'/api/v1/productsewingcost/getby_product_notin_product_balance',
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
		this.load();
	},
});
