Ext.define('GSmartApp.store.personnel.personnel_his_store', {
	extend: 'Ext.data.Store',
	storeId: 'personnel_his_store',
	alias: 'store.personnel_his_store',
	model: 'GSmartApp.model.personnel.Personnel_His_Model',
	loadStore_by_person(personnelid_link){
		var params = new Object();
		params.personnelid_link = personnelid_link == null ? 0 : personnelid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/personnel/get_his_person',
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