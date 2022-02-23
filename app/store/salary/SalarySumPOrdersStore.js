Ext.define('GSmartApp.store.SalarySumPOrdersStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalarySumPOrdersStore',
	alias: 'store.SalarySumPOrdersStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'orgid_link',   type: 'int'},
		{name: 'year',   type: 'int'},
		{name: 'month',   type: 'int'},
		{name: 'porderid_link',   type: 'int'},
		{name: 'pordergrantid_link',   type: 'int'},
		{name: 'amountstocked',   type: 'int'},
		{name: 'pordercode',   type: 'string'},
		{name: 'productcode',   type: 'string'},
		{name: 'po_buyer',   type: 'string'},
		{name: 'buyername',   type: 'string'},
		{name: 'vendorname',   type: 'string'},
		{name: 'start_date_plan',   type: 'date'},
		{name: 'finish_date_plan',   type: 'date'}
	],
	sorters: [{
        property: 'buyername',
        direction: 'ASC'
	}],
	loadStore:function(orgid_link,year,month,m){
        var params = new Object();
        params.orgid_link = orgid_link;
        params.year = year;
        params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salarysum_porders/getall_byorg',
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
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				m.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
});
