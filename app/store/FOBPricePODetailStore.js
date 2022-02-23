Ext.define('GSmartApp.store.FOBPricePODetailStore', {
    extend: 'Ext.data.Store',
    storeId: 'FOBPricePODetailStore',
	alias: 'store.FOBPricePODetailStore',
	groupField: 'productBuyerCode',
    fields: [
		{name: 'id', type: 'int'},
        {name: 'productCode', type: 'string'},
        {name: 'productBuyerCode', type: 'string'},
        {name: 'fobprice_name', type: 'string'},
        {name: 'sizesetname', type: 'string'},
        {name: 'price', type: 'number'},
        {name: 'cost', type: 'number'},
        {name: 'currencyName', type: 'string'},
	],
	loadStore: function(pcontract_poid_link){
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
			url: config.getAppBaseUrl()+'/api/v1/pcontract_price_d/getByPO',
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
});
