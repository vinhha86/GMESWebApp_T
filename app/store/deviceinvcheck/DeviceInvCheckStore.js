Ext.define('GSmartApp.store.deviceinvcheck.DeviceInvCheckStore', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceInvCheckStore',
    fields: [
		{name: 'id'},
		{name: 'invcheckdatetime', type: 'date', dateFormat: 'c', format: 'd/m/y'},
    ],
    loadStore: function(orgcheckid_link){
		var me=this;
        var params = new Object();
        params.orgcheckid_link = orgcheckid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/devicesinvcheck/devicesinvcheckGetByOrg',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
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
