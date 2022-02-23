Ext.define('GSmartApp.store.personnel.Personnel_Notmap_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.Personnel_Notmap_Store',
	storeId: 'Personnel_Notmap_Store',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'register_code', type: 'string'},
		{name: 'register_name', type: 'string'}
	],
	loadStore(){
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/personnel/getPersonnelNotmap',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
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
	},
	loadStore_byPorderGrant(pordergrantid_link){
		var params = new Object();
		params.pordergrantid_link = pordergrantid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/personnel/getby_pordergrant',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
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
