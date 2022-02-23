Ext.define('GSmartApp.store.pcontract.PContractProductTreeStore', {
    extend: 'Ext.data.TreeStore',
	alias: 'store.PContractProductTreeStore',
    storeId: 'PContractProductTreeStore',
    model: 'GSmartApp.model.pcontract.PContractProductTreeModel',
	sorters: [{
        direction: 'ASC',
        property: 'code'
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
			url: config.getAppBaseUrl()+'/api/v1/pcontractproduct/gettreeproduct',
			paramsAsJson:true,
			noCache: false,
			timeout: 120000,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'children'
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
