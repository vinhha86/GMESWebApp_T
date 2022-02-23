Ext.define('GSmartApp.store.WorkingProcess_Store', {
    extend: 'Ext.data.Store',
    storeId: 'WorkingProcess_Store',
    alias: 'store.WorkingProcess_Store',

    model: 'GSmartApp.model.WorkingProcess_Model',
       
    sorters: [{
        property: 'name',
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
			url: config.getAppBaseUrl()+'/api/v1/workingprocess/getby_product',
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
	loadby_porder: function(porderid_link){
        var me=this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/workingprocess/getby_porder',
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
    }
});
