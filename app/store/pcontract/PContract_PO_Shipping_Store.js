Ext.define('GSmartApp.store.pcontract.PContract_PO_Shipping_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Shipping_Store',
	storeId: 'PContract_PO_Shipping_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Shipping',
	sorters: [{
        direction: 'ASC',
        property: 'shipdate'
	}],
	loadStore_bypo: function(pcontract_poid_link){
		var me=this;
		var params = new Object();
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/po_shipping/getbypo',
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
