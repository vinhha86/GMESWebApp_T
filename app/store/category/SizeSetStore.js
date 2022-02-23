Ext.define('GSmartApp.store.SizeSetStore', {
    extend: 'Ext.data.Store',
    alias: 'store.SizeSetStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link', type: 'int'},
		{name: 'name',   type: 'string'},
		{name: 'comment',   type: 'string'},
		{name: 'usercreatedid_link', type: 'int'},
		{name: 'timecreate', type: 'date', dateFormat: 'c'},
		{name: 'isselected', type: 'int'}
	],
    sorters: [{
        property: 'id',
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
			 url: config.getAppBaseUrl()+'/api/v1/sizeset/getall',
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
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		}
		// 	}
		// });
	}
});
