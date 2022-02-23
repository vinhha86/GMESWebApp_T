Ext.define('GSmartApp.store.pcontract.PContractDocumentStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractDocumentStore',
	storeId: 'PContractDocumentStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
        {name: 'filename',   type: 'string'},
        {name: 'description',   type: 'string'}
    ],
	sorters: [{
        direction: 'ASC',
        property: 'filename'
	}],
	loadStore:function(pcontractid_link, productid_link){
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
			url: config.getAppBaseUrl()+'/api/v1/pcontractdocument/getbyproduct',
			paramsAsJson:true,
			extraParams : params,
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
					//  this.fireEvent('logout');
				}
			}
		});
	},
});
