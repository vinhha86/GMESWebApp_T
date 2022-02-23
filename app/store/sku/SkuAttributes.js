Ext.define('GSmartApp.store.SkuAttributes', {
    extend: 'Ext.data.Store',
    alias: 'store.skuattributes',
	model: 'GSmartApp.model.Attribute',
	// sorters: {
    //     direction: 'ASC',
    //     property: 'name'
    // },
	loadDefaultAttr:function(producttypeid_link){
		var params = new Object();
		params.producttypeid_link = producttypeid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/product/getDefaultAttr',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},	
});
