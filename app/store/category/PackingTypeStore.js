Ext.define('GSmartApp.store.PackingTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PackingTypeStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link', type: 'int'},
		{name: 'code',   type: 'string'},
		{name: 'name',   type: 'string'},
		{
            name    : 'codename', 
            convert : function (value, rec) {
               return rec.get('code') + ' - ' + rec.get('name');
            }
        }
	],
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }],	
	loadStore:function(){
		var me=this;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/packingtype/getall',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			// extraParams: params,
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
				// else {
				// 	console.log(records);
				// }				
			}
		});
	}
});
