Ext.define('GSmartApp.store.pcontract.PContractProductColorStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractProductColorStore',
	storeId: 'PContractProductColorStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'productName',   type: 'string'},
		{name: 'productCode',   type: 'string'},
        {name: 'pquantity',   type: 'int'},
        {name: 'colorid_link',   type: 'int'},
        {name: 'colorName',   type: 'string'}
	],
	sorters: [{
        direction: 'ASC',
        property: 'colorName'
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
			url: config.getAppBaseUrl()+'/api/v1/pcontract_product_color/getcolor_byproduct',
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
