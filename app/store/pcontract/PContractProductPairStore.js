Ext.define('GSmartApp.store.pcontract.PContractProductPairStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractProductPairStore',
	storeId: 'PContractProductPairStore',
	requires: ['GSmartApp.model.pcontract.PcontractPairModel'],
	model: 'GSmartApp.model.pcontract.PcontractPairModel',
	sorters: [{
        direction: 'ASC',
        property: 'productName'
	},{
        direction: 'ASC',
        property: 'productpairName'
	}],
	loadStore: function(pcontractid_link, productid_link){
		var me=this;
		productid_link = productid_link == null ? 0: productid_link;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getbypcontract',
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
					//  this.fireEvent('logout');
				}
			}
		});
	},
	load_product_not_pair: function(pcontractid_link, productpairid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productpairid_link = productpairid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getproductnotpair',
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
	load_product_pair_detail: function(pcontractid_link, productpairid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productpairid_link = productpairid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getproductpairdetail',
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
	}
});
