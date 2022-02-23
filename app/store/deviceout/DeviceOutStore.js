Ext.define('GSmartApp.store.deviceout.DeviceOutStore', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceOutStore',
	fields: [
		{name: 'id'},
		{name: 'deviceout_code', type: 'string'},
		{name: 'deviceout_date', type: 'date', dateFormat: 'c', format: 'd/m/y'},
		{name: 'usercreate_name',  type: 'string'},
		{name: 'deviceOutTypeName',   type: 'string'},
		{name: 'orgToName',  type: 'string'},
		{name: 'orgFromName',   type: 'string'},
	],
    loadStore: function(deviceout_date_from, deviceout_date_to, orgid_to_link, deviceouttypeid_link,status, limit, page){
		var me=this;
		var params = new Object();
		params.orgid_to_link = orgid_to_link;
		params.deviceouttypeid_link = deviceouttypeid_link;
		params.deviceout_date_from = deviceout_date_from;
		params.deviceout_date_to = deviceout_date_to;
		params.status = status;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/deviceout/filterall',
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
