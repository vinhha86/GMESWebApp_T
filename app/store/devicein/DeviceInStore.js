Ext.define('GSmartApp.store.devicein.DeviceInStore', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceInStore',
	fields: [
		{name: 'id'},
		{name: 'devicein_code', type: 'string'},
		{name: 'devicein_date', type: 'date', dateFormat: 'c', format: 'd/m/y'},
		{name: 'usercreate_name',  type: 'string'},
		{name: 'deviceInTypeName',   type: 'string'},
		{name: 'orgToName',  type: 'string'},
		{name: 'orgFromName',   type: 'string'},
	],
    loadStore: function(devicein_date_from, devicein_date_to, orgid_from_link, deviceintypeid_link, limit, page){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.deviceintypeid_link = deviceintypeid_link;
		params.devicein_date_from = devicein_date_from;
		params.devicein_date_to = devicein_date_to;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/devicein/filterall',
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
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	}
});
