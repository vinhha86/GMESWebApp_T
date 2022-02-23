Ext.define('GSmartApp.store.handover.HandoverSkuStore', {
    extend: 'Ext.data.Store',
	alias: 'store.HandoverSkuStore',
	storeId: 'HandoverSkuStore',
	model: 'GSmartApp.model.handover.HandoverSkuModel',
	idProperty: 'idx',
	fields: [
		{name: 'idx'},
		{name: 'id', type: 'int'},
		{name: 'totalpackage', type: 'int'},
		{name: 'totalpackagecheck', type: 'int'},
	],
	loadStore:function(handoverid_link, handoverproductid_link, porderid_link, productid_link){
        var params = new Object();
        params.handoverid_link = handoverid_link;
        params.handoverproductid_link = handoverproductid_link;
        params.porderid_link = porderid_link;
        params.productid_link = productid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handoversku/getByHandoverProduct', ///////
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
	},
	loadStore_Async:function(handoverid_link, handoverproductid_link, porderid_link, productid_link){
        var params = new Object();
        params.handoverid_link = handoverid_link;
        params.handoverproductid_link = handoverproductid_link;
        params.porderid_link = porderid_link;
        params.productid_link = productid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handoversku/getByHandoverProduct', ///////
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
	},
});
