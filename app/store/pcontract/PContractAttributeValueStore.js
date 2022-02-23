Ext.define('GSmartApp.store.pcontract.PContractAttributeValueStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractAttributeValueStore',
	storeId: 'PContractAttributeValueStore',
	fields: [
		{name: 'attributeid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'peoductid_link',   type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'attributevalueid_link',   type: 'int'},
		{name: 'attributeName',   type: 'string'},
		{name: 'attributeValueName',   type: 'string'},
		{name: 'list_attributevalueid',   type: 'string'}
    ],
	sorters: [{
        direction: 'ASC',
        property: 'attributeName'
	}],
	loadStore: function(pcontractid_link, productid_link){
		var me=this;
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
			url: config.getAppBaseUrl()+'/api/v1/pcontractattvalue/getattributebyproduct',
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
	loadStoreByProductId: function(productid_link){
		var me=this;
		var params = new Object();
        params.id = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/product/getattrvalue',
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
	}
});
