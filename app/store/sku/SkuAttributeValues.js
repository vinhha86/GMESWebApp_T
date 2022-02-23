Ext.define('GSmartApp.store.SkuAttributeValues', {
    extend: 'Ext.data.Store',
    alias: 'store.skuattributevalues',
	model: 'GSmartApp.model.Attributevalue',
	sorters: {
        direction: 'ASC',
        property: 'name'
    },
	loadByAttrId:function(attributeid_link){
		var params = new Object();
		params.id = attributeid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/attributevalue/getbyidattribute',
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
