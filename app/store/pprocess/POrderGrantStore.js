Ext.define('GSmartApp.store.pprocess.POrderGrantStore', {
    extend: 'Ext.data.Store',
	alias: 'store.POrderGrantStore',
	storeId: 'POrderGrantStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'start_date_plan', type: 'date' , dateFormat: 'c', format: 'd/m/y'},
		{
            name    : 'displayName', 
            convert : function (value, rec) {
				var startDate = Ext.Date.parse(rec.get('start_date_plan'), 'c');
				if (null == startDate) startDate = new Date(rec.get('start_date_plan'));
				var date = Ext.Date.format(startDate, 'd/m/Y');
				   // return rec.get('granttoorgname') + ' - ' + rec.get('start_date_plan');
				return rec.get('granttoorgname') + ' - ' + date;
            }
        }
	],
	loadStoreByPOrderId:function(porderid_link){
		var params = new Object();
		params.porderid_link = porderid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant/getByOrderId',
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
});
