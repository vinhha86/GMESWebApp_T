Ext.define('GSmartApp.store.deviceinvcheck.DeviceInvCheckEPCStore', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceInvCheckEPCStore',
    fields: [
        {name: 'id'}
    ],
    loadStore: function(devices_invcheckid_link){
		var me=this;
        var params = new Object();
        params.devices_invcheckid_link = devices_invcheckid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/devicesinvcheckepc/getByDevicesInvCheck',
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
